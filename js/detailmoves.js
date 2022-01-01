// const end_point_moves = 'https://pokeapi.co/api/v2/move/';

function RenderChanges(kq_move, genstart, genend, move, testgen, gen){
    if (kq_move.accuracy !== null){
        if (testgen.accuracy === 0) genstart = gen
        if (genstart === genend)
        $('.effect-move').append(`
            <p>- In Generations ${genend}, <i>${move.replace(/-/g, ' ')}</i> has ${kq_move.accuracy}% accuracy.</p>
        `)
        else
        $('.effect-move').append(`
            <p>- In Generations ${genstart}-${genend}, <i>${move.replace(/-/g, ' ')}</i> has ${kq_move.accuracy}% accuracy.</p>
        `)
        testgen.accuracy = 1
    }
    if (kq_move.power !== null){
        if (testgen.power === 0) genstart = gen
        if (genstart === genend)
        $('.effect-move').append(`
            <p>- In Gennerations ${genend}, <i>${move.replace(/-/g, ' ')}</i> has <b>${kq_move.power}</b> base power</p>
        `)
        else
        $('.effect-move').append(`
            <p>- In Gennerations ${genstart}-${genend}, <i>${move.replace(/-/g, ' ')}</i> has <b>${kq_move.power}</b> base power</p>
        `)
        testgen.power = 1
    }
    if (kq_move.pp !== null){
        if (testgen.pp === 0) genstart = gen
        if (genstart === genend)
        $('.effect-move').append(`
            <p>- In Gennerations ${genend}, <i>${move.replace(/-/g, ' ')}</i> has <b>${kq_move.pp}</b> pp</p>
        `)
        else
        $('.effect-move').append(`
            <p>- In Gennerations ${genstart}-${genend}, <i>${move.replace(/-/g, ' ')}</i> has <b>${kq_move.pp}</b> pp</p>
        `)
        testgen.pp = 1
    }
    if (kq_move.type !== null){
        if (testgen.type === 0) genstart = 1
        if (genstart === genend)
        $('.effect-move').append(`
            <p>- In Gennerations ${genend}, <i>${move.replace(/-/g, ' ')}</i> is a <b>${kq_move.type.name}-type</b> move</p>
        `)
        else
        $('.effect-move').append(`
            <p>- In Gennerations ${genstart}-${genend}, <i>${move.replace(/-/g, ' ')}</i> is a <b>${kq_move.type.name}-type</b> move</p>
        `)
        testgen.type = 1
    }
}

async function InfoMove(move){
    let resp_move = await fetch(end_point_moves.concat(`${move}`))
    let kq_move = await resp_move.json()

    let power = "--"
    let acc = "--"
    let pp ="--"
    let introduced = ""
    let priority = kq_move.priority
    let gen = 0

    if (kq_move.power !== null) power = kq_move.power
    if (kq_move.accuracy !== null) acc = kq_move.accuracy
    if (kq_move.pp !== null) pp = kq_move.pp
    if (kq_move.priority > 0) priority = "+" + kq_move.priority
    switch(kq_move.generation.name){
        case 'generation-i': {
            introduced = "Generation 1";
            gen = 1;
            break;
        }
        case 'generation-ii': {
            introduced = "Generation 2";
            gen = 2;
            break;
        }
        case 'generation-iii': {
            introduced = "Generation 3";
            gen = 3;
            break;
        }
        case 'generation-iv': {
            introduced = "Generation 4";
            gen = 4;
            break;
        }
        case 'generation-v': {
            introduced = "Generation 5";
            gen = 5;
            break;
        }
        case 'generation-vi': {
            introduced = "Generation 6";
            gen = 6;
            break;
        }
        case 'generation-vii': {
            introduced = "Generation 7";
            gen = 7;
            break;
        }
        case 'generation-viii': {
            introduced = "Generation 8";
            gen = 8;
            break;
        }
    }

    let maxpp = pp*160/100
    if (pp === 1) maxpp = 1
    if (pp === '--') maxpp = ''
    $(`.item-move-value`).append(`
        <p><button  class="btn btn-${kq_move.type.name}" onclick="getTypeMove('${kq_move.type.name}')">${kq_move.type.name.toUpperCase()}</button></p>
        <p><img src="images/move-${kq_move.damage_class.name}.png" alt="" class="img-status-move-data"> ${kq_move.damage_class.name.charAt(0).toUpperCase() + kq_move.damage_class.name.slice(1)}</p>
        <p>${power}</p>
        <p>${acc}</p>
        <p>${pp} <span>(max.${maxpp})</span></p>
        <p>${priority}</p>
        <p>${introduced}</p>
    `)

    if (kq_move.effect_entries.length > 0) {
        $(`.effect-move`).append(`
            <p>${kq_move.effect_entries[0].effect.replace('$effect_chance', kq_move.effect_chance)}</p>
        `)
    }
    $(`.effect-move`).append(`
        <h3>Changes</h3>
    `)
    if (kq_move.past_values.length > 0) {
        
        let genstart = gen - 1, genend = 0;
        let testgen = {
            accuracy: 0,
            power: 0,
            pp: 0,
            type: 0
        }
        for (let i = 0; i < kq_move.past_values.length; i++){
            genstart = genstart + 1;
            switch(kq_move.past_values[i].version_group.name){
                case 'gold-silver':{
                    genend = 1;
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend;
                    break;
                }

                case 'ruby-sapphire':{
                    genend = 2;
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend;
                    break;
                }

                case 'diamond-pearl':{
                    genend = 3;
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend
                    break;
                }

                case 'black-white':{
                    genend = 4;
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend;
                    break;
                }

                case 'x-y':{
                    genend = 5
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend;
                    break;
                }

                case 'sun-moon':{
                    genend = 6;
                    RenderChanges(kq_move.past_values[i], genstart, genend, move, testgen, gen)
                    genstart = genend
                    break;
                }
            }
        }
    }
    // console.log(kq_move.machines.length)

    $(`.machine-record`).append(`
        <h3>Machine/Record</h3>
    `)
    if (kq_move.machines.length > 0){
        
        for (let i = 0; i < kq_move.machines.length; i++){
            let resp_machine = await fetch(kq_move.machines[i].machine.url)
            let kq_machine = await resp_machine.json()
            switch(kq_move.machines[i].version_group.name){
                case 'red-blue': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen1">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen1>.record-left`).append(`
                        <p><span class="text-fire">Red</span>/<span class="text-water">Blue</span></p>
                    `)
                    $(`.gen1>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'yellow': {
                    $(`.gen1>.record-left`).append(`
                        <p><span class="text-electric">Yellow</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'gold-silver': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen2">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen2>.record-left`).append(`
                        <p><span class="text-electric">Gold</span>/<span class="text-steel">Silver</span></p>
                    `)
                    $(`.gen2>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'crystal': {
                    $(`.gen2>.record-left`).append(`
                        <p><span class="text-ice">Crystal</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'ruby-sapphire': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen3">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen3>.record-left`).append(`
                        <p><span class="text-fire">Ruby</span>/<span class="text-water">Sapphire</span></p>
                    `)
                    $(`.gen3>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'emerald': {
                    $(`.gen3>.record-left`).append(`
                        <p><span class="text-bug">Emerald</span></p>
                    `)
                    break;
                }
                case 'firered-leafgreen': {
                    $(`.gen3>.record-left`).append(`
                        <p><span class="text-fire">FireRed</span>/<span class="text-grass">LeafGreen</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'diamond-pearl': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen4">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen4>.record-left`).append(`
                        <p><span class="text-dragon">Diamond</span>/<span class="text-fairy">Pearl</span></p>
                    `)
                    $(`.gen4>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'platinum': {
                    $(`.gen4>.record-left`).append(`
                        <p><span class="text-ghost">Platinum</span></p>
                    `)
                    break;
                }
                case 'heartgold-soulsilver': {
                    $(`.gen4>.record-left`).append(`
                        <p><span class="text-electric">HeartGold</span>/<span class="text-steel">SoulSilver</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'black-white': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen5">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen5>.record-left`).append(`
                        <p><span class="text-fighting">Black</span>/<span class="text-normal">White</span></p>
                    `)
                    $(`.gen5>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'black-2-white-2': {
                    $(`.gen5>.record-left`).append(`
                        <p><span class="text-fighting">Black 2</span>/<span class="text-normal">White 2</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'x-y': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen6">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen6>.record-left`).append(`
                        <p><span class="text-fairy">X</span>/<span class="text-flying">Y</span></p>
                    `)
                    $(`.gen6>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'omega-ruby-alpha-sapphire': {
                    $(`.gen6>.record-left`).append(`
                        <p><span class="text-fire">Omega Ruby</span>/<span class="text-water">Alpha Sapphire</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }

                case 'sun-moon': {
                    $(`.machine-record`).append(`
                        <div class="row gen gen7">
                            <div class="col-8 record-left">

                            </div>
                            <div class="col-4 record-right">

                            </div>
                        </div>
                    `)
                    $(`.gen7>.record-left`).append(`
                        <p><span class="text-rock">Sun</span>/<span class="text-ghost">Moon</span></p>
                    `)
                    $(`.gen7>.record-right`).append(`
                        <p>${kq_machine.item.name.toUpperCase()}</p>
                    `)
                    break;
                }
                case 'ultra-sun-ultra-moon': {
                    $(`.gen7>.record-left`).append(`
                        <p><span class="text-rock">Ultra Sun</span>/<span class="text-ghost">Ultra Moon</span></p>
                    `)
                    $(`.machine-record`).append(`
                        <hr style="color: #ff668f; height:3px; width:90%; margin-top: 0">
                    `)
                    break;
                }
            }
        }
    }

    /* Game descriptiton */
    for (let i = 0; i < kq_move.flavor_text_entries.length; i++){
        if (kq_move.flavor_text_entries[i].language.name === 'en'){
            switch(kq_move.flavor_text_entries[i].version_group.name){
                case 'gold-silver': {
                    $(`.game-description`).append(`
                        <div class="row gen gen2">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen2>.descriptions`).append(`
                        <p><span class="text-electric">Gold</span> / <span class="text-steel">Silver</span></p>
                    `)
                    $(`.gen2>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'crystal': {
                    $(`.gen2>.descriptions`).append(`
                        <p><span class="text-ice">Crystal</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
                case 'ruby-sapphire': {
                    $(`.game-description`).append(`
                        <div class="row gen gen3">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen3>.descriptions`).append(`
                        <p><span class="text-fire">Ruby</span> / <span class="text-water">Sapphire</span></p>
                    `)
                    $(`.gen3>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'emerald': {
                    $(`.gen3>.descriptions`).append(`
                        <p><span class="text-bug">Emerald</span></p>
                    `)
                    break;
                }
                case 'firered-leafgreen': {
                    $(`.gen3>.descriptions`).append(`
                        <p><span class="text-fire">FireRed</span> / <span class="text-grass">LeafGreen</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
                case 'diamond-pearl': {
                    $(`.game-description`).append(`
                        <div class="row gen gen4">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen4>.descriptions`).append(`
                        <p><span class="text-dragon">Diamond</span> / <span class="text-fairy">Pearl</span></p>
                    `)
                    $(`.gen4>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'platinum': {
                    $(`.gen4>.descriptions`).append(`
                        <p><span class="text-ghost">Platinum</span></p>
                    `)
                    break;
                }
                case 'heartgold-soulsilver': {
                    $(`.gen4>.descriptions`).append(`
                        <p><span class="text-electric">HeartGold</span> / <span class="text-steel">SoulSilver</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
                case 'black-white': {
                    $(`.game-description`).append(`
                        <div class="row gen gen5">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen5>.descriptions`).append(`
                        <p><span class="text-fighting">Black</span> / <span class="text-normal">White</span></p>
                    `)
                    $(`.gen5>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'black-2-white-2': {
                    $(`.gen5>.descriptions`).append(`
                        <p><span class="text-fighting">Black 2</span> / <span class="text-normal">White 2</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
                case 'x-y': {
                    $(`.game-description`).append(`
                        <div class="row gen gen6">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen6>.descriptions`).append(`
                        <p><span class="text-fairy">X</span> / <span class="text-flying">Y</span></p>
                    `)
                    $(`.gen6>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'omega-ruby-alpha-sapphire': {
                    $(`.gen6>.descriptions`).append(`
                        <p><span class="text-fire">Omega Ruby</span> / <span class="text-water">Alpha Sapphire</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
                case 'sun-moon': {
                    $(`.game-description`).append(`
                        <div class="row gen gen7">
                            <div class="col-3 descriptions">

                            </div>
                            <div class="col-9 descriptions-value">

                            </div>
                        </div>
                    `)
                    $(`.gen7>.descriptions`).append(`
                        <p><span class="text-rock">Sun</span> / <span class="text-ghost">Moon</span></p>
                    `)
                    $(`.gen7>.descriptions-value`).append(`
                        <p>${kq_move.flavor_text_entries[i].flavor_text}</p>
                    `)
                    break;
                }
                case 'ultra-sun-ultra-moon': {
                    $(`.gen7>.descriptions`).append(`
                        <p><span class="text-rock">Ultra Sun</span> / <span class="text-ghost">Ultra Moon</span></p>
                    `)
                    $(`.game-description`).append(`
                        <hr style="color: #ff668f; height:3px">
                    `)
                    break;
                }
            }
        }
    }
    
    if (kq_move.learned_by_pokemon.length > 0) {
        for (let i = 0; i < kq_move.learned_by_pokemon.length; i++ ){
            let idimg = kq_move.learned_by_pokemon[i].url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
            // console.log(typeof(idimg))
            if (idimg.length < 5) {
                // console.log(idimg)
                let resp_pkm = await fetch(`${kq_move.learned_by_pokemon[i].url}`)
                let kq_pkm = await resp_pkm.json()
                let tamid = kq_pkm.id;
                if (tamid < 10) {
                    tamid = `00${kq_pkm.id}`
                }
                if ((tamid >= 10) && (tamid < 100)) {
                    tamid = `0${kq_pkm.id}`
                }
                // console.log(tamid)
                if (kq_pkm.types.length === 1){
                    $(`.pkm-learn`).append(`
                    <div class="col-3 pb-5">
                        <div class="row">
                            <div class="col-3">
                                <img onclick="getidpkm('${kq_pkm.id}')" style="width: 120%" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid}.png">
                            </div>
                            <div class="col-9 pt-3" style="line-height: 0.5;"> 
                                <p class="pkm-name">${kq_pkm.name.charAt(0).toUpperCase() + kq_pkm.name.slice(1)}</p>
                                <p>#${tamid} / <span onclick="getidtype('${kq_pkm.types[0].type.name}')" class="text-${kq_pkm.types[0].type.name}">${kq_pkm.types[0].type.name}</span></p>
                            </div>
                        </div>
                    </div>
                `)
                }
                else {
                    $(`.pkm-learn`).append(`
                    <div class="col-3 pb-5">
                        <div class="row">
                            <div class="col-3">
                                <img onclick="getidpkm('${kq_pkm.id}')" style="width: 120%" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid}.png">
                            </div>
                            <div class="col-9 pt-3" style="line-height: 0.5;"> 
                                <p class="pkm-name">${kq_pkm.name.charAt(0).toUpperCase() + kq_pkm.name.slice(1)}</p>
                                <p>#${tamid} / <span onclick="getidtype('${kq_pkm.types[0].type.name}')" class="text-${kq_pkm.types[0].type.name}">${kq_pkm.types[0].type.name}</span>-<span onclick="getidtype('${kq_pkm.types[1].type.name}')" class="text-${kq_pkm.types[1].type.name}">${kq_pkm.types[1].type.name}</span></p>
                            </div>
                        </div>
                    </div>
                `)
                }
            }
        }
        
    }
    
}

$(document).ready( () => {
    let id = sessionStorage.getItem('mname');

    if (id !== null){
        $(`.move-detail>h2`).append(`
            ${id.toUpperCase().replace(/-/g, ' ')}
        `)

        InfoMove(id)
    }
    
    
    fetch(end_point_moves)
        .then((resp) => resp.json())
        .then(async () =>{
            for(let i = 1; i < 827; i++){
                await fetch(end_point_moves.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data.past_values.length > 0){
                            console.log(i + ':' + data.name)
                        }
                    })
            }
        })
})