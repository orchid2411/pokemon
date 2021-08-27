function opengen(evt, gen) {
    /* Back top page */
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0)

    let tabcontent = $(`.tabcontent`);
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let tablinks = $('.tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-dex", "");
    }
    let tam = $(`#${gen}`);
    tam[0].style.display = "block";
    evt.currentTarget.className += " active-dex";

    let detail = document.getElementById('detail')
    detail.style.display = "none"

    let more_1 = document.querySelector(`#${gen}`).querySelectorAll('#more-1');
    let more_2 = document.querySelector(`#${gen}`).querySelectorAll('#more-2');
    let more_btn = document.querySelector(`#${gen}`).querySelector('#more-btn');
    more_btn.style.display = "block";
    for (let i = 0; i < more_1.length; i++) {
        more_1[i].setAttribute("id", "more-0");
    }
    for (let i = 0; i < more_2.length; i++) {
        more_2[i].setAttribute("id", "more-0");
    }
    let more_0 = document.querySelector(`#${gen}`).querySelectorAll('#more-0');
    for (let i = 12; i < more_0.length; i++) {
        if (i < 24) 
            more_0[i].setAttribute("id", "more-1");
        if (i >= 24)
            more_0[i].setAttribute("id", "more-2");
    }
}

function openatk(type) {
    let panel = $(".panel")
    for (let i = 0; i < panel.length; i++) {
        panel[i].style.display = "none"
    }
    let type1 = $(`#${type}`)
    let accordion = document.querySelectorAll(`#${type1[0].id}`)
    accordion[accordion.length-1].style.display = "block";
    let tam = type1[0].id.replace('-ATK', '').toLowerCase()
    console.log(tam)
    atkType(tam);
}

const end_point_type = 'https://pokeapi.co/api/v2/type/';
const end_point_moves = 'https://pokeapi.co/api/v2/move/';
const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
const end_point_pkm_species = 'https://pokeapi.co/api/v2/pokemon-species/';
const end_point_abi = 'https://pokeapi.co/api/v2/ability/'
async function atkType(type) {
    let tamType = await fetch(end_point_type.concat(`${type}`))
    let kqType = await tamType.json();
    console.log(kqType.moves)

    let move_name = [];
    for (let i = 0; i < kqType.moves.length; i++) {
            move_name[i] =kqType.moves[i].name
    }
    move_name.sort();
    console.log(move_name)

    for (let i = 0; i < move_name.length; i++) {

        let resp1 = await fetch(end_point_moves.concat(`${move_name[i]}`))
        let kqdetail = await resp1.json()

        let power = kqdetail.power;
        let accuracy = kqdetail.accuracy;
        let atktype = '';
        let pp = kqdetail.pp;

        if (kqdetail.power == null) power = '--'
        if (kqdetail.accuracy == null) accuracy = '--'
        if (kqdetail.pp == null) pp = '--'
        if (kqdetail.damage_class === null) atktype = '--' 
        else atktype = kqdetail.damage_class.name;

        $(`#${type.toUpperCase()}-ATK>.table-move`).append(`
        <tr>
            <td style="text-align: left; padding-left: 5px">${kqdetail.name.replace(/-/g,' ')}</td>
            <td>${atktype}</td>
            <td>${power}</td>
            <td>${pp}</td>
            <td>${accuracy}</td>
        </tr>
        `)
    }
}

$("#defaultOpen").click();

function moreFunc(gen) {
    let more = document.querySelector(`#${gen}`).querySelectorAll('#more-1');
    let more1 = document.querySelector(`#${gen}`).querySelectorAll('#more-2');
    let more_btn = document.querySelector(`#${gen}`).querySelector('#more-btn');

    for (let i = 0; i < more.length; i++) {
        more[i].setAttribute("id", "more-0");
        if (more1.length === 0) {
            more_btn.style.display = "none";
        }
        if (more1.length >= 12) {
            more1[i].setAttribute("id", "more-1");
        }
        if (more1.length < 12) 
            for (let j = 0; j < more1.length; j++)
                more1[j].setAttribute("id", "more-1");
    }
} 

/* Detail Ability */
async function Abi_Detail(nameAbi) {
    let resp_abi = await fetch(end_point_abi.concat(`${nameAbi}`))
    let kq_abi = await resp_abi.json();
    let detail_abi = '';

    if (kq_abi.effect_entries[0].language.name === 'en')
        detail_abi = kq_abi.effect_entries[0].effect;
    else
        detail_abi = kq_abi.effect_entries[1].effect;

    return detail_abi;
}

/* Render Dame Taken */
function DamTaken(a, b, c) {
    if (a.length != 0) {
        $('.def').append(`
            <div class="title-type ${b} col-${12/c}">
                <p>${b} damage</p>
            </div>
        `)
        for (let i = 0; i < a.length; i++) {
            $(`.def>.${b}`).append(`
                <a class="btn one-item btn-${a[i]}" onclick="opengen(event, '${a[i].toUpperCase()}')">${a[i].toUpperCase()}</a>
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

async function DetailPKM(id) {
    /* Back top page */
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0)

    $('#detail>.row').empty();

    let tabcontent = $(`.tabcontent`);
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let detail = document.getElementById('detail')
    detail.style.display = "block"

    let [resp_pkm, resp_spe] = await Promise.all([fetch(end_point_pkm.concat(`${id}`)), fetch(end_point_pkm_species.concat(`${id}`))]) ;
    let [kq_pkm, kq_spe] = await Promise.all([resp_pkm.json(), resp_spe.json()]) ;

    let tamid = id
    if (id < 10) {
        tamid = `00${id}`
    }
    if ((id >= 10) && (id < 100)) {
        tamid = `0${id}`
    }

    /* Image */
    $('#detail>.row').append(`
        <div class="col-6">
            <div class="tabs_div_img">
                <div class="tab">
                    <button class="tablinks" onclick="openform('form-1')" id="defaultOpen">${kq_pkm.name}</button>
                    <button class="tablinks" onclick="openform('form-2')">Mega ${kq_pkm.name}</button>
                    <button class="tablinks" onclick="openform('form-3')">Gigamax ${kq_pkm.name}</button>
                </div>
                <div id="form-1" class="tabcontent_form">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png"
                        alt="...">
                </div>
                <div id="form-2" class="tabcontent_form">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f2.png"
                        alt="...">
                </div>
                <div id="form-3" class="tabcontent_form">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f3.png"
                        alt="...">
                </div>
            </div>
        </div>
    `)

    /* Shiny */
    $('#detail>.row').append(`
        <div class="shiny-img col-2">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
                alt="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png"
                alt="">
        </div>
    `)

    /* Base Infor */
    if (kq_pkm.types.length === 1)
        $('#detail>.row').append(`
            <div class="col-4">
                <h3>${kq_pkm.name.toUpperCase()}</h3>
                <p>No: ${tamid}</p>
                <p>Type: 
                    <a class="btn one-item btn-${kq_pkm.types[0].type.name}" onclick="opengen(event, '${kq_pkm.types[0].type.name.toUpperCase()}')">${kq_pkm.types[0].type.name.toUpperCase()}</a>
                </p>
                <p>Gender: <i class="fas fa-mars male"></i>${(8-kq_spe.gender_rate)/8*100}% / <i class="fas fa-venus female"></i>${100-(8-kq_spe.gender_rate)/8*100}%
                </p>
                <p>Height: ${kq_pkm.height/10}m</p>
                <p>Weight: ${kq_pkm.weight/10}kg</p>
                <p>Capture Rate: ${kq_spe.capture_rate}</p>
            </div>
        `)
    else
        $('#detail>.row').append(`
            <div class="col-4">
                <h3>${kq_pkm.name.toUpperCase()}</h3>
                <p>No: ${tamid}</p>
                <p>Type: 
                    <a class="btn two-item btn-${kq_pkm.types[0].type.name}" onclick="opengen(event, '${kq_pkm.types[0].type.name.toUpperCase()}')">${kq_pkm.types[0].type.name.toUpperCase()}</a>
                    <a class="btn two-item btn-${kq_pkm.types[1].type.name}" onclick="opengen(event, '${kq_pkm.types[1].type.name.toUpperCase()}')">${kq_pkm.types[1].type.name.toUpperCase()}</a>
                </p>
                <p>Gender: <i class="fas fa-mars male"></i>${(8-kq_spe.gender_rate)/8*100}% / <i class="fas fa-venus female"></i>${100-(8-kq_spe.gender_rate)/8*100}%
                </p>
                <p>Height: ${kq_pkm.height/10}m</p>
                <p>Weight: ${kq_pkm.weight/10}kg</p>
                <p>Capture Rate: ${kq_spe.capture_rate}</p>
            </div>
        `)

    /* Detail Infor */
    $('#detail>.row').append(`
        <div class="row">
            <div class="tabs_div">
                <ul>
                    <li>Abilities</li>
                    <li>Dame Taken</li>
                    <li>Evolution</li>
                    <li>Stats</li>
                    <li>Attack</li>
                    <li>misc</li>
                </ul>
            </div>
        </div>
    `)

    /* Abiliti */
    if (kq_pkm.abilities.length === 1){
        $('.tabs_div').append(`
            <div>
                <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase()}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
            </div>
        `)
    }
    else 
        if (kq_pkm.abilities.length === 2)
            $('.tabs_div').append(`
                <div>
                    <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase()}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[1].ability.name.toUpperCase()}(hidden ability):</span> ${await Abi_Detail(kq_pkm.abilities[1].ability.name)}</p>
                </div>
            `)
        else
            $('.tabs_div').append(`
                <div>
                    <p><span>${kq_pkm.abilities[0].ability.name.toUpperCase()}:</span> ${await Abi_Detail(kq_pkm.abilities[0].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[1].ability.name.toUpperCase()}:</span> ${await Abi_Detail(kq_pkm.abilities[1].ability.name)}</p>
                    <p><span>${kq_pkm.abilities[2].ability.name.toUpperCase()}(hidden ability):</span> ${await Abi_Detail(kq_pkm.abilities[2].ability.name)}</p>
                </div>
            `)

    /* Dame Taken */
    $('.tabs_div').append(`
        <div>
            <div class="row def">
            </div>
        </div>
    `)

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
            // nodame[0] = '';
            console.log(kq_type)
            console.log(kq_type_1)

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

            DamTaken(damex4, '4times', tam)
            DamTaken(damex2, 'double', tam)
            DamTaken(halfdame, 'half', tam)
            DamTaken(quarterdame, 'quarter', tam)
            DamTaken(nodame, 'no', tam)
    }   

    $('.tabs_div').append(`
        <div>
            <div class="evl row">
                <div class="col-2"></div>
                <div class="mt-5 col-2">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="">
                    <img class="ps-3" src="https://serebii.net/pokedex-xy/evoicon/l16.png" alt="">
                </div>
                <div class="mt-5 col-2">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" alt="">
                    <img class="ps-3" src="https://serebii.net/pokedex-xy/evoicon/l32.png" alt="">
                </div>
                <div class="mt-5 col-1">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="">
                </div>
                <div class="mt-4 col-1">
                    <img class="ps-4" src="https://serebii.net/pokedex-xy/evoicon/mega3.png" alt="">
                    <img class="ps-4" src="https://serebii.net/pokedex-xy/evoicon/mega384.png" alt="">
                </div>
                <div class="col-2">
                    <div class="col-12">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10033.png" alt="">                                          
                    </div>
                    <div class="col-12">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10186.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">HP</div>
                <div class="col-1">80</div>
                <div class="col-6">
                    <div class="stats-80">
                    </div>
                </div>
                <div class="col-1">270</div>
                <div class="col-1">364</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Attack</div>
                <div class="col-1">82</div>
                <div class="col-6">
                    <div class="stats-80">
                    </div>
                </div>
                <div class="col-1">152</div>
                <div class="col-1">289</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Defense</div>
                <div class="col-1">83</div>
                <div class="col-6">
                    <div class="stats-80">
                    </div>
                </div>
                <div class="col-1">153</div>
                <div class="col-1">291</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Sp.Atk</div>
                <div class="col-1">100</div>
                <div class="col-6">
                    <div class="stats-100">
                    </div>
                </div>
                <div class="col-1">184</div>
                <div class="col-1">328</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Sp.Def</div>
                <div class="col-1">100</div>
                <div class="col-6">
                    <div class="stats-100">
                    </div>
                </div>
                <div class="col-1">184</div>
                <div class="col-1">328</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Speed</div>
                <div class="col-1">80</div>
                <div class="col-6">
                    <div class="stats-80">
                    </div>
                </div>
                <div class="col-1">148</div>
                <div class="col-1">284</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-1">Total</div>
                <div class="col-1">525</div>
                <div class="col-6">
                </div>
                <div class="col-1">Min</div>
                <div class="col-1">Max</div>
            </div>
        </div>
        <div>
        
        </div>
        <div>
            <table class="table">
                <tbody>
                    <tr>
                        <td class="success">Base Exp: </td>
                        <td>65</td>
                    </tr>
                    <tr>
                        <td class="success">Exp Growth: </td>
                        <td>medium-slow (1000000000 Points)</td>
                    </tr>
                    <tr>
                        <td class="success">Base happiness: </td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td class="success">Effors: </td>
                        <td>1 Attack Point(s), 2 Attack Point(s)</td>
                    </tr>
                    <tr>
                        <td class="success">Hold item: </td>
                        <td>--</td>
                    </tr>
                    <tr>
                        <td class="success">Egg groups: </td>
                        <td>grass, monster</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `)

    let tabcontent_form = $(`.tabcontent_form`);
    for (let i = 1; i < tabcontent_form.length; i++) {
        tabcontent_form[i].style.display = "none";
    }

    $(".tabs_div").shieldTabs();
}

function openform(form) {
    let tabcontent_form = $(`.tabcontent_form`);
    for (let i = 0; i < tabcontent_form.length; i++) {
        tabcontent_form[i].style.display = "none";
    }

    let tam = $(`#${form}`);
    tam[0].style.display = "block";
}

