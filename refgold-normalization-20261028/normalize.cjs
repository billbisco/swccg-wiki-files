// Deterministic crop/scale only. Tested with sharp 0.35.5. No text/art regeneration.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

async function main() {
  const [manifestPath, sourceDir, outputDir] = process.argv.slice(2);
  if (!outputDir) throw new Error('Usage: node normalize.cjs manifest.json source-directory output-directory');
  const manifest = JSON.parse(fs.readFileSync(manifestPath));
  fs.mkdirSync(outputDir, {recursive:true});
  const report = [];
  for (const item of manifest.cards) {
    if (!item.reviewed) throw new Error('Unreviewed crop: '+item.source);
    if (!['portrait','landscape'].includes(item.orientation)) throw new Error('Unknown orientation: '+item.source);
    if (path.resolve(sourceDir,item.source)===path.resolve(outputDir,item.output)) throw new Error('Refusing to overwrite source');
    const bytes = fs.readFileSync(path.join(sourceDir, item.source));
    if (hash(bytes)!==item.sourceSha256) throw new Error('Source changed: '+item.source);
    const m = await sharp(bytes).metadata();
    const b = item.bounds;
    if (b.left<0 || b.top<0 || b.left+b.width>m.width || b.top+b.height>m.height) throw new Error('Invalid bounds');
    const horizontal = item.orientation==='landscape';
    const width = horizontal ? 1039 : 745, height = horizontal ? 745 : 1039;
    // Luke reference frame: x=36..708, y=35..1003 on a 745x1039 canvas.
    // Include a 2px source guard in reviewed bounds; fit inside this safe rectangle.
    const innerWidth = horizontal ? 969 : 673, innerHeight = horizontal ? 673 : 969;
    if (item.allowUpscale && item.sourceClass !== 'historical-low-resolution') throw new Error('Upscaling requires historical source classification');
    const fitGap=item.maxFaceFitGap??3;
    if (fitGap>25 || fitGap<3) throw new Error('Unreviewed fit tolerance');
    const cropped = await sharp(bytes).extract(b).png().toBuffer();
    const face = await sharp(cropped).rotate(item.rotation||0).resize(innerWidth,innerHeight,{fit:'inside',kernel:'lanczos3',withoutEnlargement:!item.allowUpscale}).flatten({background:'#000000'}).png().toBuffer();
    const fm = await sharp(face).metadata();
    if (fm.width<innerWidth-fitGap || fm.height<innerHeight-fitGap) throw new Error('Face ratio/resolution outside tolerance: '+item.source);
    const left=Math.floor((width-fm.width)/2), top=Math.floor((height-fm.height)/2);
    const framed=await sharp({create:{width,height,channels:4,background:'#000000'}}).composite([{input:face,left,top}]).png().toBuffer();
    const radius=22;
    const mask=Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="white"/></svg>`);
    const result=await sharp(framed).composite([{input:mask,blend:'dest-in'}]).png({compressionLevel:9}).toBuffer();
    const target=path.join(outputDir,item.output);
    fs.writeFileSync(target,result);
    // Verify exact face preservation after compositing (rounding only touches outer black corners).
    const expected=await sharp(face).ensureAlpha().raw().toBuffer();
    const actual=await sharp(result).extract({left,top,width:fm.width,height:fm.height}).ensureAlpha().raw().toBuffer();
    if (!expected.equals(actual)) throw new Error('Face pixels changed during framing: '+item.output);
    const {data,info}=await sharp(result).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const at=(x,y)=>data[(y*info.width+x)*4+3];
    if ([at(0,0),at(width-1,0),at(0,height-1),at(width-1,height-1)].some(a=>a!==0)) throw new Error('Opaque corner');
    report.push({...item,inputDimensions:[m.width,m.height],outputDimensions:[width,height],faceDimensions:[fm.width,fm.height],faceOffset:[left,top],radius,bytes:result.length,outputSha256:hash(result),facePixelsUnchanged:true});
    console.log(item.output,width+'x'+height,'PASS');
  }
  fs.writeFileSync(path.join(outputDir,'conversion-report.json'),JSON.stringify({sharp:sharp.versions,method:'reviewed crop; uniform Lanczos3 resize; black canvas; rounded alpha mask',cards:report},null,2));
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
