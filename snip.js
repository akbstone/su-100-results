var a = [];
var checkpoints = p.columns.filter(k=>k.match(/^start|^finish|^in|^out/i))
p.forEach(racer=>{
    const name = racer['Last Name'];
    const bib = racer['Bib #'];
    const lastName = racer['Last Name'];
    const gender = racer['Gender'];
    const division = racer['Division'];
    let shouldBreak = false;
    let hasDNS = racer['FH 1'] === 'DNS' ? true : false;
    checkpoints.forEach(c=>{
        if(!shouldBreak){
            const checkpoint = c.replace(/time$|^in|^out/i,'').trim();
            let type = c.match(/^in/i) ? 'In' : 'Out';
            let status = 'Racing';
            const val = racer[c];
            const date = val.match(/day 2/i) ? '2012-02-13' : '2012-02-12';
            const time = val.match(':') ? val.split(', ')[1] : null;
            const hours = time ? time.split(':')[0] : null;
            const min = time ? time.split(':')[1] : null;
            if(hasDNS){
                type = 'Status Update';
                status = 'DNS';
                shouldBreak = true;
            }
            if(val.toLowerCase() === 'dnf'){
                status = 'DNF';
                shouldBreak = true;
            }
            if(checkpoint.toLowerCase() === 'finish'){
                status = 'Finished';
                shouldBreak = true;
            }
            if(val === 'SCRATCH'){
                status = 'Scratch';
                shouldBreak = true;
            }
            a.push([
                bib,
                lastName,
                division,
                gender,
                checkpoint,
                type,
                date,
                hours,
                min,
                0,
                status

            ])

        }
    })        


})
a.map(d=>d.join("\t")).join("\n")