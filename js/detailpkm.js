const end_point_type = 'https://pokeapi.co/api/v2/type/';
const end_point_moves = 'https://pokeapi.co/api/v2/move/';
const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
const end_point_pkm_species = 'https://pokeapi.co/api/v2/pokemon-species/';
const end_point_abi = 'https://pokeapi.co/api/v2/ability/';
const end_point_gen = 'https://pokeapi.co/api/v2/generation/';
const end_point_growth = 'https://pokeapi.co/api/v2/growth-rate/';
let MaxIdPkm = 898;

/* Detail Ability */
async function Abi_Detail(nameAbi) {
    let resp_abi = await fetch(end_point_abi.concat(`${nameAbi}`))
    let kq_abi = await resp_abi.json();
    let detail_abi = '';

    switch (nameAbi) {
        case 'ripen':{ detail_abi = 'Doubles the effect of berries.'; break; }
        case 'ice-scales':{ detail_abi = 'Halves damage from Special moves.'; break; }
        default: {
            if (kq_abi.effect_entries[0].language.name === 'en')
                detail_abi = kq_abi.effect_entries[0].effect;
            else
                detail_abi = kq_abi.effect_entries[1].effect;
        }
    }
    return detail_abi;
}

/* Render Dame Taken */
function DamTaken(a, b, c) {
    if (a.length != 0) {
        $('.def').append(`
            <div class="title-type ${b} col-${12/c} ps-2 pe-2">
                <p>${b} damage</p>
            </div>
        `)
        for (let i = 0; i < a.length; i++) {
            $(`.def>.${b}`).append(`
                <a id="${a[i]}" class="btn one-item btn-${a[i]}" onclick="getidtype('${a[i]}')">${a[i].toUpperCase()}</a>
            `)
        }
    }
}

/* Damex4 or quarterdame */
function DamexDame(a, b) {
    let dame = [], k = 0;
    for (let i = 0; i < a.length; i++ ) {
        for (let j = 0; j < b.length; j++) {
            if (b[j].name === a[i].name) {
                dame[k] = a[i].name;
                k++;
                break;
            }
        }
    }
    return dame;
}

/* Damex2, halfdame and nodame*/
function Dame(a, b) {
    let dame = [];
    for (let i = 0; i < a.length; i++ ) {
        dame[i] = a[i].name;
    }
    for (let i = 0; i < b.length; i++) {
        dame[dame.length] = b[i].name
    }
    for (let i = 0; i < dame.length; i++) {
        for (let j = i + 1; j < dame.length; j++) {
            if (dame[i] === dame[j]) {
                dame[j] = dame[dame.length-1];
                dame.length = dame.length-1;
                break;
            }
        }
    }
    return dame;
}

function FilterDame(a, b) {
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (a[j] === b[i]) {
                a[j] = a[a.length-1]
                a.length = a.length-1
                break;
            }
        }
    }
    return a;
}

/* ID Pokemon */
function CheckID(id) {
    let tamid = id;
    if (tamid < 10) {
        tamid = `00${id}`
    }
    if ((tamid >= 10) && (tamid < 100)) {
        tamid = `0${id}`
    }
    return tamid;
}

/* Kind of Evolution */
function Evolution(adr) {
    let addr = adr.evolution_details[0]
    if (adr.species.name === 'melmetal') return 'Pokémon GO only, 400 Meltan Candies'
    else {
        switch (addr.trigger.name) {
            case 'level-up': { 
                if (addr.min_happiness != null) {
                    if (addr.time_of_day != "") return `${addr.min_happiness} happiness, ${addr.time_of_day}time`
                    return `${addr.min_happiness} happiness`
                }

                switch (adr.species.name ) {
                    case "leafeon" : return `level up near a Mossy Rock`
                    case 'glaceon' : return `level up near an Icy Rock`
                    case 'magnezone' : return `level up in a Magnetric Field area`
                    case 'probopass' : return `level up in a Magnetric Field area`
                    case 'vikavolt' : return `level up in a Magnetric Field area`
                    case 'crabominable' : return `level up in a Mount Lanakila`
                    case 'solgaleo' : return `level ${addr.min_level} in SUN`
                    case 'lunala' : return `level ${addr.min_level} in MOON`
                    case 'grapploct' : return `after taunt learned`
                }

                if (addr.known_move_type != null) return `knowing ${addr.known_move_type.name} move`
                if (addr.known_move != null) return `after ${addr.known_move.name} learned`

                if (addr.held_item != null) {
                    if (addr.time_of_day != null) return `hold ${addr.held_item.name.replace(/-/g,' ')}, ${addr.time_of_day}time`
                    return `hold ${addr.held_item.name.replace(/-/g,' ')}`
                }

                switch (addr.relative_physical_stats) {
                    case -1 : return `level ${addr.min_level}, atk < def`
                    case 0 : return `level ${addr.min_level}, atk = def`
                    case 1 : return `level ${addr.min_level}, atk > def`
                }

                if (addr.party_species != null) return `with ${addr.party_species.name} in party`

                switch (addr.gender) {
                    case 1 : return `level ${addr.min_level}, <i class="fas fa-venus female"></i>`
                    case 2 : return `level ${addr.min_level}, <i class="fas fa-mars male"></i>`
                }

                if (addr.needs_overworld_rain != false) return `level ${addr.min_level}, during rain`

                switch (addr.time_of_day){
                    case 'day': return `level ${addr.min_level}, daytime`
                    case 'night': return `level ${addr.min_level}, nighttime`
                }
                return `level ${addr.min_level}` 
            }

            case 'trade': {
                if (addr.held_item != null){
                    let hitem = addr.held_item.name.replace(/-/g,' ');
                    return `trade holding ${hitem}`
                } 
                if (addr.trade_species != null) return `trade with ${addr.trade_species.name}`
                return `trade`  
            }

            case 'use-item': {
                switch (adr.species.name ) {
                    case "flapple" : return `use Tart Apple`
                    case 'appletun' : return `use Sweet Apple`
                    case 'polteageist' : return `use Cracked Pot`
                }
                let uitem = addr.item.name.replace(/-/g,' ');
                if (addr.gender === 1) return `use ${uitem}, <i class="fas fa-venus female"></i>` 
                return `use ${uitem}` 
            }

            case 'other': {
                switch (adr.species.name) {
                    case "sirfetchd" : return `achieve 3 critical hits in one battle`
                    case 'runerigus' : return `near Dusty Bowl`
                    case 'alcremie' : return `spin around holding Sweet`
                }
            }

            case 'shed': {
                return `level 20, empty spot in party, Pokéball in bag`
            }
        }
    }
}

/* Check Stat */
function CheckStat(stat) {
    if (stat < 60) return 60;
    if ((stat >= 60) && (stat<100)) return 80;
    if ((stat >= 100) && (stat<120)) return 100;
    if ((stat >= 120) && (stat<150)) return 120;
    if (stat >= 150) return 150;
}

function WidthStat(stat) {
    return (stat/180)*100;
}

async function RenderAbi(kq_pkm) {
    /* Abiliti */
    if (kq_pkm.abilities.length === 1){
        $('.tabs_div>.abi').append(`
            <div>
                <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase().replace(/-/g, ' ')}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
            </div>
        `)
    }
    else 
        if (kq_pkm.abilities.length === 2)
            $('.tabs_div>.abi').append(`
                <div>
                    <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase().replace(/-/g, ' ')}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[1].ability.name.toUpperCase().replace(/-/g, ' ')}(hidden ability):</span> ${await Abi_Detail(kq_pkm.abilities[1].ability.name)}</p>
                </div>
            `)
        else
            $('.tabs_div>.abi').append(`
                <div>
                    <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase().replace(/-/g, ' ')}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[1].ability.name.toUpperCase().replace(/-/g, ' ')}:</span> ${await Abi_Detail(kq_pkm.abilities[1].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[2].ability.name.toUpperCase().replace(/-/g, ' ')}(hidden ability):</span> ${await Abi_Detail(kq_pkm.abilities[2].ability.name)}</p>
                </div>
            `)
}

async function RenderDamtaken(kq_pkm) {
    /* DameTaken */
    if (kq_pkm.types.length === 1) {
        let resp_type = await fetch(end_point_type.concat(`${kq_pkm.types[0].type.name}`))
        let kq_type = await resp_type.json()

        let tam = 0;
        if (kq_type.damage_relations.double_damage_from.length != 0) tam++;
        if (kq_type.damage_relations.half_damage_from.length != 0) tam++;
        if (kq_type.damage_relations.no_damage_from.length != 0) tam++;

        let damex2 = Dame(kq_type.damage_relations.double_damage_from, kq_type.damage_relations.double_damage_from)
        let halfdame = Dame(kq_type.damage_relations.half_damage_from, kq_type.damage_relations.half_damage_from)
        let nodame = Dame(kq_type.damage_relations.no_damage_from, kq_type.damage_relations.no_damage_from)

        DamTaken(damex2, 'double', tam)
        DamTaken(halfdame, 'half', tam)
        DamTaken(nodame, 'no', tam)
    }
    else {
            let [resp_type, resp_type_1] = await Promise.all([fetch(end_point_type.concat(`${kq_pkm.types[0].type.name}`)), fetch(end_point_type.concat(`${kq_pkm.types[1].type.name}`))]) ;
            let [kq_type, kq_type_1] = await Promise.all([resp_type.json(), resp_type_1.json()]) ;

            /* 4times dame */
            let damex4 = DamexDame(kq_type.damage_relations.double_damage_from, kq_type_1.damage_relations.double_damage_from)

            /* quarter dame */
            let quarterdame = DamexDame(kq_type.damage_relations.half_damage_from, kq_type_1.damage_relations.half_damage_from)

            /* no dame */
            let nodame = Dame(kq_type.damage_relations.no_damage_from, kq_type_1.damage_relations.no_damage_from)

            /* double dame */
            let damex2 = Dame(kq_type.damage_relations.double_damage_from, kq_type_1.damage_relations.double_damage_from)

            /* half dame */
            let halfdame = Dame(kq_type.damage_relations.half_damage_from, kq_type_1.damage_relations.half_damage_from)

            /* filter double vs 4times */
            damex2 = FilterDame(damex2, damex4)

            /* filter double vs nodame */
            damex2 = FilterDame(damex2, nodame)

            /* filter half vs quarter */
            halfdame = FilterDame(halfdame, quarterdame)

            /* filter half vs nodame */
            halfdame = FilterDame(halfdame, nodame)

            /* filter double and half */
            for (let i = 0; i < damex2.length; i++) {
                for (let j = 0; j < halfdame.length; j++) {
                    if (halfdame[j] === damex2[i]) {
                        halfdame[j] = halfdame[halfdame.length-1];
                        halfdame.length = halfdame.length-1;
                        damex2[i] = damex2[damex2.length-1];
                        damex2.length = damex2.length-1;
                        i--;
                        break;
                    }
                }
            }

            let tam = 0;
            if (damex4.length != 0) tam++;
            if (damex2.length != 0) tam++;
            if (halfdame.length != 0) tam++;
            if (quarterdame.length != 0) tam++;
            if (nodame.length != 0) tam++;
            if (tam === 5) tam++;

            if (tam === 6) {
                $('.def').append(`
                    <div class="col-1">
                    </div>
                `)
            }

            DamTaken(damex4, '4times', tam)
            DamTaken(damex2, 'double', tam)
            DamTaken(halfdame, 'half', tam)
            DamTaken(quarterdame, 'quarter', tam)
            DamTaken(nodame, 'no', tam)
    }
}

async function RenderEvol(kq_spe) {
    /* Evolution */
    let resp_evol = await fetch(kq_spe.evolution_chain.url)
    let kq_evol = await resp_evol.json()

    let resp_pkm1 = await fetch(`${kq_evol.chain.species.url}`)
    let kq_pkm1 = await resp_pkm1.json()
    let tamid1 = CheckID(kq_pkm1.id);
    
    if (kq_evol.chain.evolves_to.length != 0) {
        for (let i = 0; i < kq_evol.chain.evolves_to.length; i++) {
            let resp_pkm2 = await fetch(`${kq_evol.chain.evolves_to[i].species.url}`)
            let kq_pkm2 = await resp_pkm2.json()
            let tamid2 = CheckID(kq_pkm2.id);
            let KoE = Evolution(kq_evol.chain.evolves_to[i])
            $('.tabs_div>.evol').append(`
                <div class="evl evl-${i} row">
                    <div class="col-2">
                        <img id="${kq_pkm1.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid1}.png" alt="" onclick="getidpkm('${kq_pkm1.id}')">
                    </div>
                    <div class="mt-5 pt-4 col-2" style="text-align: center">
                        <i class="icon-arrow icon-arrow-e"></i>
                        <small>(${KoE})</small>
                    </div>
                    <div class="col-2">
                        <img id="${kq_pkm2.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid2}.png" alt="" onclick="getidpkm('${kq_pkm2.id}')">
                    </div>
                </div>
            `)

            if (kq_evol.chain.evolves_to[i].evolves_to.length === 0) {
                $(`.evl-${i}`).prepend(`
                    <div class="col-3"></div>
                `)
            } 
            else {
                $(`.evl-${i}`).prepend(`
                    <div class="col-1"></div>
                `)
                
                let resp_pkm3 = await fetch(`${kq_evol.chain.evolves_to[i].evolves_to[0].species.url}`)
                let kq_pkm3 = await resp_pkm3.json()
                let tamid3 = CheckID(kq_pkm3.id);
                KoE = Evolution(kq_evol.chain.evolves_to[i].evolves_to[0])
                $(`.evl-${i}`).append(`
                    <div class="mt-5 pt-4 col-2" style="text-align: center">
                        <i class="icon-arrow icon-arrow-e"></i>
                        <small>(${KoE})</small>
                    </div>
                    <div class="col-2">
                        <img id="${kq_pkm3.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid3}.png" alt="" onclick="getidpkm('${kq_pkm3.id}')">
                    </div>
                `)

                for (let j = 1; j < kq_evol.chain.evolves_to[i].evolves_to.length; j++) {
                    KoE = Evolution(kq_evol.chain.evolves_to[i])
                    $('.tabs_div>.evol').append(`
                        <div class="evl evl-${j} row">
                            <div class="col-2">
                                <img id="${kq_pkm1.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid1}.png" alt="" onclick="getidpkm('${kq_pkm1.id}')">
                            </div>
                            <div class="mt-5 pt-4 col-2" style="text-align: center">
                                <i class="icon-arrow icon-arrow-e"></i>
                                <small>(${KoE})</small>
                            </div>
                            <div class="col-2">
                                <img id="${kq_pkm2.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid2}.png" alt="" onclick="getidpkm('${kq_pkm2.id}')">
                            </div>
                        </div>
                    `)

                    $(`.evl-${j}`).prepend(`
                        <div class="col-1"></div>
                    `)
                    
                    let resp_pkm3 = await fetch(`${kq_evol.chain.evolves_to[i].evolves_to[j].species.url}`)
                    let kq_pkm3 = await resp_pkm3.json()
                    let tamid3 = CheckID(kq_pkm3.id);
                    KoE = Evolution(kq_evol.chain.evolves_to[i].evolves_to[j])
                    $(`.evl-${j}`).append(`
                        <div class="mt-5 pt-4 col-2" style="text-align: center">
                            <i class="icon-arrow icon-arrow-e"></i>
                            <small>(${KoE})</small>
                        </div>
                        <div class="col-2">
                            <img id="${kq_pkm3.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid3}.png" alt="" onclick="getidpkm('${kq_pkm3.id}')">
                        </div>
                    `)
                }
            }
        }
    }
    else {
        $('.tabs_div>.evol').append(`
                <div class="evl row">
                    <div class="col-5"></div>
                    <div class="col-2">
                        <img id="${kq_pkm1.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${tamid1}.png" alt="" onclick="getidpkm('${kq_pkm1.id}')">
                    </div>
                </div>
            `)
    }
}

function RenderStat(kq_pkm) {
    /* Stats */
    let TotalStat = 0;
    for (let i = 0; i < kq_pkm.stats.length; i++) {
        TotalStat += kq_pkm.stats[i].base_stat
    }
    $('.tabs_div>.stat').append(`
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">HP</div>
            <div class="col-1">${kq_pkm.stats[0].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[0].base_stat)}" style="width: ${kq_pkm.stats[0].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Attack</div>
            <div class="col-1">${kq_pkm.stats[1].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[1].base_stat)}" style="width: ${kq_pkm.stats[1].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Defense</div>
            <div class="col-1">${kq_pkm.stats[2].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[2].base_stat)}" style="width: ${kq_pkm.stats[2].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Sp.Atk</div>
            <div class="col-1">${kq_pkm.stats[3].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[3].base_stat)}" style="width: ${kq_pkm.stats[3].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Sp.Def</div>
            <div class="col-1">${kq_pkm.stats[4].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[4].base_stat)}" style="width: ${kq_pkm.stats[4].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Speed</div>
            <div class="col-1">${kq_pkm.stats[5].base_stat}</div>
            <div class="col-6">
                <div class="stats-${CheckStat(kq_pkm.stats[5].base_stat)}" style="width: ${kq_pkm.stats[5].base_stat*100/180}%">
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-1">Total</div>
            <div class="col-1">${TotalStat}</div>
            <div class="col-6">
            </div>
        </div>
    `)
}

async function RenderGenMove(kq_pkm) {
    let start = 0;
    if (kq_pkm.id < 152) start = 1;
    if ((kq_pkm.id >=152) && (kq_pkm.id < 252)) start = 2
    if ((kq_pkm.id >=252) && (kq_pkm.id < 387)) start = 3
    if ((kq_pkm.id >=387) && (kq_pkm.id < 494)) start = 4
    if ((kq_pkm.id >=494) && (kq_pkm.id < 650)) start = 5
    if ((kq_pkm.id >=650) && (kq_pkm.id < 722)) start = 6
    if ((kq_pkm.id >=722) && (kq_pkm.id < 810)) start = 7
    if ((kq_pkm.id >=810) && (kq_pkm.id < 898)) start = 8
    for (let i = start; i < 8; i++) {
        let resp_gen = await fetch(end_point_gen.concat(`${i}`))
        let kq_gen = await resp_gen.json()

        $('.attack>.checkgen').append(`
            <button id="gen${i}" class="btn-gen" onclick="OpenBtnGen('gen${i}')">${i}</button>
        `)

        $(`.attack`).append(`
            <div class="move-gen" id="gen${i}">
                <div class="tabs_div_move">
                    <ul>
                    </ul>
                </div>
            </div>
        `)
        
        for (let j = 0; j < kq_gen.version_groups.length; j++) {
            if ((kq_gen.version_groups[j].name != 'colosseum') && (kq_gen.version_groups[j].name != 'xd') && (kq_gen.version_groups[j].name != 'lets-go')) {
                $(`#gen${i}>.tabs_div_move>ul`).append(`
                    <li>${kq_gen.version_groups[j].name.replace(/-/g, ' ')}</li>
                `)
                $(`#gen${i}>.tabs_div_move`).append(`
                    <div class="${kq_gen.version_groups[j].name.replace(/-/g, '')}">
                        <div class="row">
                            <div class="coltmcase col-6">
                                <div class="levelup">
                                    <h4>Moves learnt by level up</h4>
                                    <table class="table-move">
                                        <tr>
                                            <th>Lv.</th>
                                            <th>Move</th>
                                            <th>Type</th>
                                            <th>Cat.</th>
                                            <th>Power</th>
                                            <th>Accuracy</th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="egg">
                                    <h4>Moves learnt by egg</h4>
                                    <table class="table-move">
                                        <tr>
                                            <th>Move</th>
                                            <th>Type</th>
                                            <th>Cat.</th>
                                            <th>Power</th>
                                            <th>Accuracy</th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="tutor">
                                    <h4>Moves learnt by tutor</h4>
                                    <table class="table-move">
                                        <tr>
                                            <th>Move</th>
                                            <th>Type</th>
                                            <th>Cat.</th>
                                            <th>Power</th>
                                            <th>Accuracy</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="coltmcase col-6">
                                <div class="hm">
                                    <h4>Moves learnt by HM</h4>
                                    <table class="table-move">
                                        <tr>
                                            <th>HM</th>
                                            <th>Move</th>
                                            <th>Type</th>
                                            <th>Cat.</th>
                                            <th>Power</th>
                                            <th>Accuracy</th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="tm">
                                    <h4>Moves learnt by TM</h4>
                                    <table class="table-move">
                                        <tr>
                                            <th>TM</th>
                                            <th>Move</th>
                                            <th>Type</th>
                                            <th>Cat.</th>
                                            <th>Power</th>
                                            <th>Accuracy</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
        // $(".tabs_div_move").shieldTabs();
    }
    $(".tabs_div_move").shieldTabs();
}

/* Open gen move Pokemon */
function OpenBtnGen(a) {
    let move_gen = $(`.move-gen`)
    for (let i = 0; i < move_gen.length; i++) {
        move_gen[i].style.display = "none"
    }

    let btn_gen = $(`.btn-gen`)
    for (let i = 0; i < btn_gen.length; i++) {
        btn_gen[i].style.background = "lightgrey"
    }

    let gen = $(`#${a}`)
    let cgen = document.querySelectorAll(`#${gen[0].id}`)
    cgen[cgen.length-1].style.display = "block";
    cgen[0].style.background = 'white'
}

/* Render Move Learnt by LevelUp */
async function RenderMoveByLevelup(levelup) {
    for (let i = 0; i < levelup.length; i++) {
        if (levelup[i].lv != 0) {
            let resp_nmove = await fetch(end_point_moves.concat(`${levelup[i].mname}`))
            let kq_nmove = await resp_nmove.json()
            let mpower = '--';
            let macc = '--'
            if (kq_nmove.power != null) mpower = kq_nmove.power;
            if (kq_nmove.accuracy != null) macc = kq_nmove.accuracy;
            $(`.${levelup[i].local}>.row>.coltmcase>.levelup>table`).append(`
                <tr>
                    <td>${levelup[i].lv}</td>
                    <td><a onclick="getidMname('${levelup[i].mname}')">${levelup[i].mname.replace(/-/g, ' ')}</a></td>
                    <td><a onclick="getTypeMove('${kq_nmove.type.name}')" class="btn one-item btn-${kq_nmove.type.name}">${kq_nmove.type.name.toUpperCase()}</a></td>
                    <td><img src="images/move-${kq_nmove.damage_class.name}.png" style="width:40%" title="${kq_nmove.damage_class.name}"></td>
                    <td>${mpower}</td>
                    <td>${macc}</td>
                </tr>
            `)
        }
    }
}
/* Render Move Learnt By Machine */
async function RenderMoveByMachine(tmcase) {
    for (let i = 0; i < tmcase.length; i++) {
        let resp_nmove = await fetch(end_point_moves.concat(`${tmcase[i].mname}`))
        let kq_nmove = await resp_nmove.json()
        let mpower = '--';
        let macc = '--'
        if (kq_nmove.power != null) mpower = kq_nmove.power;
        if (kq_nmove.accuracy != null) macc = kq_nmove.accuracy;
        let vitri = tmcase[i].name.slice(0,2)
        let thutu = tmcase[i].name.slice(2)
        $(`.${tmcase[i].local}>.row>.coltmcase>.${vitri}>table`).append(`
            <tr>
                <td>${thutu}</td>
                <td><a onclick="getidMname('${tmcase[i].mname}')">${tmcase[i].mname.replace(/-/g, ' ')}</a></td>
                <td><a onclick="getTypeMove('${kq_nmove.type.name}')" class="btn one-item btn-${kq_nmove.type.name}">${kq_nmove.type.name.toUpperCase()}</a></td>
                <td><img src="images/move-${kq_nmove.damage_class.name}.png" style="width:40%" title="${kq_nmove.damage_class.name}"></td>
                <td>${mpower}</td>
                <td>${macc}</td>
            </tr>
        `)
    }
}
/* Render Move Learnt By Egg or Tutor */
async function RenderMoveByEggorTutor(kqapi, type) {
    for (let i = 0; i < kqapi.length; i++) {
        let resp_nmove = await fetch(end_point_moves.concat(`${kqapi[i].mname}`))
        let kq_nmove = await resp_nmove.json()
        let mpower = '--';
        let macc = '--'
        if (kq_nmove.power != null) mpower = kq_nmove.power;
        if (kq_nmove.accuracy != null) macc = kq_nmove.accuracy;
        $(`.${kqapi[i].local}>.row>.coltmcase>.${type}>table`).append(`
            <tr>
                <td><a onclick="getidMname('${kqapi[i].mname}')">${kqapi[i].mname.replace(/-/g, ' ')}</a></td>
                <td><a onclick="getTypeMove('${kq_nmove.type.name}')" class="btn one-item btn-${kq_nmove.type.name}">${kq_nmove.type.name.toUpperCase()}</a></td>
                <td><img src="images/move-${kq_nmove.damage_class.name}.png" style="width:40%" title="${kq_nmove.damage_class.name}"></td>
                <td>${mpower}</td>
                <td>${macc}</td>
            </tr>
        `)
    }
}

let tmcase = [{
    name: "",
    mname: "",
    local: ""
}]
let ntm = 0;
async function setMoveMachine(kq_machine){
    for (let j = 0; j < kq_machine.machines.length; j++) {
        if ((kq_machine.machines[j].version_group.name != 'colosseum') && (kq_machine.machines[j].version_group.name != 'xd')) {
            let resp_tmcase = await fetch(`${kq_machine.machines[j].machine.url}`)
            let kq_tmcase = await resp_tmcase.json()

            tmcase[ntm] = {
                name: `${kq_tmcase.item.name}`,
                mname: `${kq_tmcase.move.name}`,
                local: `${kq_tmcase.version_group.name.replace(/-/g, '')}`
            }
            ntm++
        }
    }
}

async function RenderAtk(kq_pkm) {

    await RenderGenMove(kq_pkm)

    let move_gen = $('.move-gen')
    for (let i = 1; i < move_gen.length; i++) {
        move_gen[i].style.display = "none"
    }

    let btn_gen = $(`.btn-gen`)
    btn_gen[0].style.background = "white"

    /* Get move */
    let levelup = [{
        lv: "",
        mname: "",
        local: ""
    }], 
    machine = [], 
    egg = [{
        mname: "",
        local: ""
    }], 
    tutor = [{
        mname: "",
        local: ""
    }]
    let nlevel = 0, nmachine = 0, negg = 0, ntutor = 0;
    for (let i = 0; i< kq_pkm.moves.length; i++) {

        for (let j = 0; j < kq_pkm.moves[i].version_group_details.length; j++) {
            switch (kq_pkm.moves[i].version_group_details[j].move_learn_method.name) {
                case 'level-up': {
                    if ((kq_pkm.moves[i].version_group_details[j].version_group.name != 'colosseum') && (kq_pkm.moves[i].version_group_details[j].version_group.name != 'xd')) {
                        levelup[nlevel] = {
                            lv: `${kq_pkm.moves[i].version_group_details[j].level_learned_at}`,
                            mname: `${kq_pkm.moves[i].move.name}`,
                            local: `${kq_pkm.moves[i].version_group_details[j].version_group.name.replace(/-/g, '')}`
                        }
                        nlevel++
                    }
                    break
                }

                case 'machine': {
                    if ((kq_pkm.moves[i].version_group_details[j].version_group.name != 'colosseum') && (kq_pkm.moves[i].version_group_details[j].version_group.name != 'xd')) {
                        if (nmachine === 0) {
                            machine[nmachine] = kq_pkm.moves[i].move.name
                            nmachine++
                        }
                        else {
                            for (let k = 0; k < machine.length; k++) {
                                if (kq_pkm.moves[i].move.name === machine[k]) {
                                    break
                                }
                                else {
                                    if (k === machine.length - 1) {
                                        machine[nmachine] = kq_pkm.moves[i].move.name
                                        nmachine++
                                    }
                                }
                            }
                        }
                    }
                    break
                }

                case 'egg': {
                    if ((kq_pkm.moves[i].version_group_details[j].version_group.name != 'colosseum') && (kq_pkm.moves[i].version_group_details[j].version_group.name != 'xd')) {
                        egg[negg] = {
                            mname: `${kq_pkm.moves[i].move.name}`,
                            local: `${kq_pkm.moves[i].version_group_details[j].version_group.name.replace(/-/g, '')}`
                        }
                        negg++
                    }
                    break
                }

                case 'tutor': {
                    if ((kq_pkm.moves[i].version_group_details[j].version_group.name != 'colosseum') && (kq_pkm.moves[i].version_group_details[j].version_group.name != 'xd')) {
                        tutor[ntutor] = {
                            mname: `${kq_pkm.moves[i].move.name}`,
                            local: `${kq_pkm.moves[i].version_group_details[j].version_group.name.replace(/-/g, '')}`
                        }
                        ntutor++
                    }
                    break
                }
            }
        }
    }
    /* Get TM, HM move */
    // let tmcase = [{
    //     name: "",
    //     mname: "",
    //     local: ""
    // }]
    // let ntm = 0;
    for (let i = 0; i< machine.length; i++) {
        
        let resp_machine = await fetch(end_point_moves.concat(`${machine[i]}`))
        let kq_machine = await resp_machine.json()

        setMoveMachine(kq_machine)
        // for (let j = 0; j < kq_machine.machines.length; j++) {
        //     if ((kq_machine.machines[j].version_group.name != 'colosseum') && (kq_machine.machines[j].version_group.name != 'xd')) {
        //         let resp_tmcase = await fetch(`${kq_machine.machines[j].machine.url}`)
        //         let kq_tmcase = await resp_tmcase.json()

        //         tmcase[ntm] = {
        //             name: `${kq_tmcase.item.name}`,
        //             mname: `${kq_tmcase.move.name}`,
        //             local: `${kq_tmcase.version_group.name.replace(/-/g, '')}`
        //         }
        //         ntm++
        //     }
        // }
    }

    /* Sort obj */
    levelup.sort((a,b) =>  a.lv - b.lv)
    tmcase.sort(function(case1, case2) {
        let a = case1.name.toLowerCase();
        let b = case2.name.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });
    
    if (egg.length > 1) {
        Promise.all([RenderMoveByLevelup(levelup), RenderMoveByMachine(tmcase), RenderMoveByEggorTutor(egg, 'egg'), RenderMoveByEggorTutor(tutor, 'tutor')])
    }
    else {
        Promise.all([RenderMoveByLevelup(levelup), RenderMoveByMachine(tmcase), RenderMoveByEggorTutor(tutor, 'tutor')])
    }
    
}

/* Render Misc */
async function RenderMisc(kq_pkm, kq_spe) {
    let resp_growth = await fetch(end_point_growth.concat(`${kq_spe.growth_rate.name}`))
    let kq_growth = await resp_growth.json()
    $('.tabs_div>.misc').append(`
        <table class="table">
            <tbody>
                <tr>
                    <td>Base Exp: </td>
                    <td>${kq_pkm.base_experience}</td>
                </tr>
                <tr>
                    <td>Exp Growth: </td>
                    <td>${kq_spe.growth_rate.name.replace(/-/g, ' ')} (${kq_growth.levels[kq_growth.levels.length-1].experience} Points)</td>
                </tr>
                <tr>
                    <td>Base happiness: </td>
                    <td>${kq_spe.base_happiness}</td>
                </tr>
                <tr>
                    <td>Effort: </td>
                    <td>
                        <ul class="effort" style="list-style-type:none; padding:0;">
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Egg groups: </td>
                    <td>
                        <ul class="egggroup" style="list-style-type:none; padding:0;">
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    `)
    for (let i = 0; i < kq_pkm.stats.length; i++) {
        if (kq_pkm.stats[i].effort != 0) {
            $('.effort').append(`
                <li>${kq_pkm.stats[i].effort} ${kq_pkm.stats[i].stat.name.replace(/-/g, ' ')}</li>
            `)
        }
    }
    for (let i = 0; i < kq_spe.egg_groups.length; i++) {
        $('.egggroup').append(`
            <li>${kq_spe.egg_groups[i].name}</li>
        `)
    }
}

async function DetailPKM(id) {
    
    BackTopPage();

    let tabcontent = $(`.tabcontent`);
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let detail = document.getElementById('detail')
    detail.style.display = "block"

    let resp_pkm = await fetch(end_point_pkm.concat(`${id}`)) ;
    let kq_pkm= await resp_pkm.json();
    let resp_spe = await fetch(`${kq_pkm.species.url}`) ;
    let kq_spe = await resp_spe.json();

    let tamid = CheckID(id)

    /* Base Infor */
    if (kq_spe.gender_rate >= 0) {
        gendermale = kq_spe.gender_rate;
        genderfemale = 8 - kq_spe.gender_rate;
    }
    else {
        gendermale = 8;
        genderfemale = 8;
    }
    let number = kq_spe.capture_rate/765*100;
    let capture = (Math.round(number * 100)/100).toFixed(1)
    if (kq_pkm.types.length === 1)
        $('#detail>.row').prepend(`
            <div class="col-4">
                <h3>${kq_pkm.name.toUpperCase()}</h3>
                <p>No: ${tamid}</p>
                <p>Type: 
                    <a id="${kq_pkm.types[0].type.name}" class="btn one-item btn-${kq_pkm.types[0].type.name}" onclick="getidtype('${kq_pkm.types[0].type.name}')">${kq_pkm.types[0].type.name.toUpperCase()}</a>
                </p>
                <p>Gender: <i class="fas fa-mars male"></i>${(8-gendermale)/8*100}% / <i class="fas fa-venus female"></i>${(8-genderfemale)/8*100}%
                </p>
                <p>Height: ${kq_pkm.height/10}m</p>
                <p>Weight: ${kq_pkm.weight/10}kg</p>
                <p>Capture Rate: ${kq_spe.capture_rate} <span style="font-size:14px; color:lightgray">(${capture}% with pokeball, fullhp)</span></p>
            </div>
        `)
    else
        $('#detail>.row').prepend(`
            <div class="col-4">
                <h3>${kq_pkm.name.toUpperCase()}</h3>
                <p>No: ${tamid}</p>
                <p>Type: 
                    <a id="${kq_pkm.types[0].type.name}" class="btn two-item btn-${kq_pkm.types[0].type.name}" onclick="getidtype('${kq_pkm.types[0].type.name}')">${kq_pkm.types[0].type.name.toUpperCase()}</a>
                    <a id="${kq_pkm.types[1].type.name}" class="btn two-item btn-${kq_pkm.types[1].type.name}" onclick="getidtype('${kq_pkm.types[1].type.name}')">${kq_pkm.types[1].type.name.toUpperCase()}</a>
                </p>
                <p>Gender: <i class="fas fa-mars male"></i>${(8-gendermale)/8*100}% / <i class="fas fa-venus female"></i>${(8-genderfemale)/8*100}%
                </p>
                <p>Height: ${kq_pkm.height/10}m</p>
                <p>Weight: ${kq_pkm.weight/10}kg</p>
                <p>Capture Rate: ${kq_spe.capture_rate} <span style="font-size:14px; color:lightgray">(${capture}% with pokeball, fullhp)</p>
            </div>
        `)

    $('#detail>.row').prepend(`
        <div class="col-1">
        </div>
    `)
    /* Shiny */
    $('#detail>.row').prepend(`
        <div class="shiny-img col-1">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
                alt="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png"
                alt="">
        </div>
    `)

    /* Image */
    // $('#detail>.row').append(`
    //     <div class="col-6">
    //         <div class="tabs_div_img">
    //             <div class="tab">
    //                 <button class="tablinks" onclick="openform('form-1')" id="defaultOpen">${kq_pkm.name}</button>
    //                 <button class="tablinks" onclick="openform('form-2')">Mega ${kq_pkm.name}</button>
    //                 <button class="tablinks" onclick="openform('form-3')">Gigamax ${kq_pkm.name}</button>
    //             </div>
    //             <div id="form-1" class="tabcontent_form">
    //                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png"
    //                     alt="...">
    //             </div>
    //             <div id="form-2" class="tabcontent_form">
    //                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f2.png"
    //                     alt="...">
    //             </div>
    //             <div id="form-3" class="tabcontent_form">
    //                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f3.png"
    //                     alt="...">
    //             </div>
    //         </div>
    //     </div>
    // `)
    $('#detail>.row').prepend(`
        <div class="col-5">
            <div class="tabs_div_img">
                <div class="tabcontent_form">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png"
                        alt="...">
                </div>
            </div>
        </div>
    `)
    $('#detail>.row').prepend(`
        <div class="col-1">
        </div>
    `)
    let preId = kq_pkm.id - 1;
    let nextId = kq_pkm.id + 1;
    if (kq_pkm.id === 1) {
        preId = MaxIdPkm
    }
    if (kq_pkm.id === MaxIdPkm) {
        nextId = 1
    }
    let resp_pkm_pre = await fetch(end_point_pkm.concat(`${preId}`))
    let kq_pkm_pre = await resp_pkm_pre.json()
    let resp_pkm_next = await fetch(end_point_pkm.concat(`${nextId}`))
    let kq_pkm_next = await resp_pkm_next.json()
    $('#detail').prepend(`
        <div class="row">
            <div class="col-2">
                <button id="${preId}" class="switchbtn prebtn" onclick="getidpkm('${preId}')">
                    <i class="fas fa-chevron-circle-left"></i> #${kq_pkm_pre.id} ${kq_pkm_pre.name.toUpperCase()}
                </button>
            </div>
            <div class="col-8">
            </div>
            <div class="col-2">
                <button id="${nextId}" class="switchbtn nextbtn" onclick="getidpkm('${nextId}')">
                    #${kq_pkm_next.id} ${kq_pkm_next.name.toUpperCase()} <i class="fas fa-chevron-circle-right"></i>
                </button>
            </div>
        </div>
    `)

    Promise.all([RenderAbi(kq_pkm), RenderDamtaken(kq_pkm), RenderEvol(kq_spe), RenderStat(kq_pkm), RenderAtk(kq_pkm), RenderMisc(kq_pkm, kq_spe)])

    $(".tabs_div").shieldTabs();

    let tabcontent_form = $(`.tabcontent_form`);
    for (let i = 1; i < tabcontent_form.length; i++) {
        tabcontent_form[i].style.display = "none";
    }

}

$(document).ready(() => {
    let id = sessionStorage.getItem('id');
    DetailPKM(id)
})