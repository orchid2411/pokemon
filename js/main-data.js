$(document).ready(() => {

    const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
    const end_point_gen = 'https://pokeapi.co/api/v2/generation/';
    const end_point_type = 'https://pokeapi.co/api/v2/type/';

    function ktIDMore(i, more) {
        if (i <= more) return k = 0;
        if ((i > more) && (i <= more + 12)) return k = 1;
        if (i > more + 12) return k = 2;
    }

    function IdPkm(id) {
        let tamid = id;
        if (tamid < 10) {
            tamid = `00${tamid}`
        }
        if ((tamid >= 10) && (tamid < 100)) {
            tamid = `0${tamid}`
        }
        return tamid;
    }

    function OneTypeOneAbi(kq, location, k) {
        let tamid = IdPkm(kq.id)
        $(`#${location}>.container>.row`).append(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                <div class="card-pkm">
                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                    <div class="card-item-data">
                        <img id="${kq.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="..." onclick="getidpkm('${kq.id}')">
                        <div class="card-body d-flex flex-column">
                            <span>#${tamid}</span>
                            <span>${kq.name.toUpperCase()}</span>
                            <div class="d-flex justify-content-center">
                                <a class="btn one-item btn-${kq.types[0].type.name}" onclick="opengen(event, '${kq.types[0].type.name.toUpperCase()}')">${kq.types[0].type.name.toUpperCase()}</a>
                            </div>
                            <span>Abilities: <p>${kq.abilities[0].ability.name}</p> </span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    function OneTypeTwoAbi(kq, location, k) {
        let tamid = IdPkm(kq.id)
        $(`#${location}>.container>.row`).append(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                <div class="card-pkm">
                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                    <div class="card-item-data">
                        <img id="${kq.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="..." onclick="getidpkm('${kq.id}')">
                        <div class="card-body d-flex flex-column">
                            <span>#${tamid}</span>
                            <span>${kq.name.toUpperCase()}</span>
                            <div class="d-flex justify-content-center">
                                <a class="btn one-item btn-${kq.types[0].type.name}" onclick="opengen(event, '${kq.types[0].type.name.toUpperCase()}')">${kq.types[0].type.name.toUpperCase()}</a>
                            </div>
                            <span>Abilities: <p>${kq.abilities[0].ability.name} / ${kq.abilities[1].ability.name}</p> </span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    function TwoTypeOneAbi(kq, location, k) {
        let tamid = IdPkm(kq.id)
        $(`#${location}>.container>.row`).append(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                <div class="card-pkm">
                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                    <div class="card-item-data">
                        <img id="${kq.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="..." onclick="getidpkm('${kq.id}')">
                        <div class="card-body d-flex flex-column">
                            <span>#${tamid}</span>
                            <span>${kq.name.toUpperCase()}</span>
                            <div class="d-flex justify-content-around">
                                <a class="btn two-item btn-${kq.types[0].type.name}" onclick="opengen(event, '${kq.types[0].type.name.toUpperCase()}')">${kq.types[0].type.name.toUpperCase()}</a>
                                <a class="btn two-item btn-${kq.types[1].type.name}" onclick="opengen(event, '${kq.types[1].type.name.toUpperCase()}')">${kq.types[1].type.name.toUpperCase()}</a>
                            </div>
                            <span>Abilities: <p>${kq.abilities[0].ability.name}</p> </span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    function TwoTypeTwoAbi(kq, location, k) {
        let tamid = IdPkm(kq.id)
        $(`#${location}>.container>.row`).append(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                <div class="card-pkm">
                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                    <div class="card-item-data">
                        <img id="${kq.id}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="..." onclick="getidpkm('${kq.id}')">
                        <div class="card-body d-flex flex-column">
                            <span>#${tamid}</span>
                            <span>${kq.name.toUpperCase()}</span>
                            <div class="d-flex justify-content-around">
                                <a class="btn two-item btn-${kq.types[0].type.name}" onclick="opengen(event, '${kq.types[0].type.name.toUpperCase()}')">${kq.types[0].type.name.toUpperCase()}</a>
                                <a class="btn two-item btn-${kq.types[1].type.name}" onclick="opengen(event, '${kq.types[1].type.name.toUpperCase()}')">${kq.types[1].type.name.toUpperCase()}</a>
                            </div>
                            <span>Abilities: <p>${kq.abilities[0].ability.name} / ${kq.abilities[1].ability.name}</p> </span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    /* Form Pokemon */
    // async function RenderForm(kq_spe_pkm, location) {
    //     let check = 1;
    //     for (let i = 1; i < kq_spe_pkm.varieties.length; i++) {
    //         let name = kq_spe_pkm.varieties[i].pokemon.name.replace(`${kq_spe_pkm.varieties[0].pokemon.name}-`,'')
    //         switch (name) {
    //             case 'mega': { check++; break;} 
    //             case 'mega-x': { check++; break;} 
    //             case 'mega-y': { check++; break;} 
    //             case 'alola': { check++; break;}
    //             case 'galar': { check++; break;} 
    //             case 'gmax': { check++; break;} 
    //             default: { check = 1; break;} 
    //         }
    //         if (check != 1) {
    //             let resp_form = await fetch(`${kq_spe_pkm.varieties[i].pokemon.url}`)
    //             let kq_form = await resp_form.json()
    //             k = 0
    //             let tamid = kq_spe_pkm.id;
    //             if (tamid < 10) {
    //                 tamid = `00${tamid}`
    //             }
    //             if ((tamid >= 10) && (tamid < 100)) {
    //                 tamid = `0${tamid}`
    //             }
    //             if (kq_form.types.length === 1) {
    //                 if (kq_form.abilities.length === 1) {
    //                     $(`#${location}>.container>.row`).append(`
    //                     <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
    //                         <div class="card-pkm">
    //                             <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
    //                             <div class="card-item-data">
    //                                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f${check}.png" alt="..." onclick="DetailPKM('${kq_form.id}')">
    //                                 <div class="card-body d-flex flex-column">
    //                                     <span>#${tamid}</span>
    //                                     <span>${kq_form.name.toUpperCase()}</span>
    //                                     <div class="d-flex justify-content-center">
    //                                         <a class="btn one-item btn-${kq_form.types[0].type.name}" onclick="opengen(event, '${kq_form.types[0].type.name.toUpperCase()}')">${kq_form.types[0].type.name.toUpperCase()}</a>
    //                                     </div>
    //                                     <span>Abilities: <p>${kq_form.abilities[0].ability.name}</p> </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `)
    //                 }
    //                 else {
    //                     $(`#${location}>.container>.row`).append(`
    //                     <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
    //                         <div class="card-pkm">
    //                             <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
    //                             <div class="card-item-data">
    //                                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f${check}.png" alt="..." onclick="DetailPKM('${kq_form.id}')">
    //                                 <div class="card-body d-flex flex-column">
    //                                     <span>#${tamid}</span>
    //                                     <span>${kq_form.name.toUpperCase()}</span>
    //                                     <div class="d-flex justify-content-center">
    //                                         <a class="btn one-item btn-${kq_form.types[0].type.name}" onclick="opengen(event, '${kq_form.types[0].type.name.toUpperCase()}')">${kq_form.types[0].type.name.toUpperCase()}</a>
    //                                     </div>
    //                                     <span>Abilities: <p>${kq_form.abilities[0].ability.name} / ${kq_form.abilities[1].ability.name}</p> </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `)
    //                 }
    //             }
    //             else {
    //                 if (kq_form.abilities.length === 1) {
    //                     $(`#${location}>.container>.row`).append(`
    //                     <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
    //                         <div class="card-pkm">
    //                             <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
    //                             <div class="card-item-data">
    //                                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f${check}.png" alt="..." onclick="DetailPKM('${kq_form.id}')">
    //                                 <div class="card-body d-flex flex-column">
    //                                     <span>#${tamid}</span>
    //                                     <span>${kq_form.name.toUpperCase()}</span>
    //                                     <div class="d-flex justify-content-around">
    //                                         <a class="btn two-item btn-${kq_form.types[0].type.name}" onclick="opengen(event, '${kq_form.types[0].type.name.toUpperCase()}')">${kq_form.types[0].type.name.toUpperCase()}</a>
    //                                         <a class="btn two-item btn-${kq_form.types[1].type.name}" onclick="opengen(event, '${kq_form.types[1].type.name.toUpperCase()}')">${kq_form.types[1].type.name.toUpperCase()}</a>
    //                                     </div>
    //                                     <span>Abilities: <p>${kq_form.abilities[0].ability.name}</p> </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `)
    //                 }
    //                 else {
    //                     $(`#${location}>.container>.row`).append(`
    //                     <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
    //                         <div class="card-pkm">
    //                             <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
    //                             <div class="card-item-data">
    //                                 <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}_f${check}.png" alt="..." onclick="DetailPKM('${kq_form.id}')">
    //                                 <div class="card-body d-flex flex-column">
    //                                     <span>#${tamid}</span>
    //                                     <span>${kq_form.name.toUpperCase()}</span>
    //                                     <div class="d-flex justify-content-around">
    //                                         <a class="btn two-item btn-${kq_form.types[0].type.name}" onclick="opengen(event, '${kq_form.types[0].type.name.toUpperCase()}')">${kq_form.types[0].type.name.toUpperCase()}</a>
    //                                         <a class="btn two-item btn-${kq_form.types[1].type.name}" onclick="opengen(event, '${kq_form.types[1].type.name.toUpperCase()}')">${kq_form.types[1].type.name.toUpperCase()}</a>
    //                                     </div>
    //                                     <span>Abilities: <p>${kq_form.abilities[0].ability.name} / ${kq_form.abilities[1].ability.name}</p> </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     `)
    //                 }
    //             }
    //         }
    //     }
    // }

    async function RenderPKM(start, end, location) {
        for (let i = start; i < end; i++) {
            let resp_pkm = await fetch(end_point_pkm.concat(`${i}`))
            let kq_pkm = await resp_pkm.json();
            k = ktIDMore(i, start + 11);
            if (kq_pkm.types.length === 1) {
                if (kq_pkm.abilities.length === 1) {
                    OneTypeOneAbi(kq_pkm, location, k)
                }
                else {
                    OneTypeTwoAbi(kq_pkm, location, k)
                }
            }
            else {
                if (kq_pkm.abilities.length === 1) {
                    TwoTypeOneAbi(kq_pkm, location, k)
                }
                else {
                    TwoTypeTwoAbi(kq_pkm, location, k)
                }
            }

            // let resp_species = await fetch(`${kq_pkm.species.url}`)
            // let kq_species = await resp_species.json()
            // if (kq_species.varieties.length > 1) await RenderForm(kq_species, location)
        }
    }

    async function RenderType(type) {
        let resp_type = await fetch(end_point_type.concat(`${type}`))
        let kq_type = await resp_type.json();
        for (let i = 0; i < kq_type.pokemon.length; i++) {
            let resp_pkm = await fetch(`${kq_type.pokemon[i].pokemon.url}`)
            let kq_pkm = await resp_pkm.json();
            if (kq_pkm.id > 10000) break;
            k = ktIDMore(i, 11);
            let tamid = kq_pkm.id;
            if (tamid < 10) {
                tamid = `00${tamid}`
            }
            if ((tamid >= 10) && (tamid < 100)) {
                tamid = `0${tamid}`
            }
            if (kq_pkm.types.length === 1) {
                if (kq_pkm.abilities.length === 1) {
                    OneTypeOneAbi(kq_pkm, type.toUpperCase(), k)
                }
                else {
                    OneTypeTwoAbi(kq_pkm, type.toUpperCase(), k)
                }
            }
            else {
                if (kq_pkm.abilities.length === 1) {
                    TwoTypeOneAbi(kq_pkm, type.toUpperCase(), k)
                }
                else {
                    TwoTypeTwoAbi(kq_pkm, type.toUpperCase(), k)
                }
            }
        }
    }

    /* COUNTRY */
    async function RenderPkmGen() {
        let resp_gen = await fetch(end_point_gen)
        let kq_gen = await resp_gen.json()
        let result_gen = kq_gen.count +1;
        let tam = 0;
        for (let i = 1; i < result_gen; i++) {
            let resp_loca = await fetch(end_point_gen.concat(`${i}`))
            let kq_loca = await resp_loca.json()
            $('.pkdex').append(`
                <div id="${kq_loca.main_region.name.toUpperCase()}" class="tabcontent">
                    <div class="container">
                        <div class="row">
                        </div>
                        <button onclick="moreFunc('${kq_loca.main_region.name.toUpperCase()}')" id="more-btn">More <span class="down_arrow"></span></button>
                    </div>
                </div>
            `)
            RenderPKM(tam + 1, tam + kq_loca.pokemon_species.length + 1, kq_loca.main_region.name.toUpperCase())
            tam = tam + kq_loca.pokemon_species.length;
        }
    }
    RenderPkmGen()
    /* button country */
    async function RenderBtnGen() {
        let resp_gen = await fetch(end_point_gen)
        let kq_gen = await resp_gen.json()
        let result_gen = kq_gen.count +1;
        for (let i = 1; i < result_gen; i++) {
            let resp_loca = await fetch(end_point_gen.concat(`${i}`))
            let kq_loca = await resp_loca.json()
            $('.tab-gen').append(`
                <button class="tablinks" onclick="opengen(event, '${kq_loca.main_region.name.toUpperCase()}')"><a href="#top">${kq_loca.main_region.name.toUpperCase()}</a></button>
            `)
        }
    }
    RenderBtnGen()

    /* TYPE */
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then((data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('.pkdex').append(`
                        <div id="${data.name.toUpperCase()}" class="tabcontent">
                            <div class="container">
                                <div class="row">
                                </div>
                                <button onclick="moreFunc('${data.name.toUpperCase()}')" id="more-btn">More <span class="down_arrow"></span></button>
                            </div>
                        </div>
                        `)
                        RenderType(data.name)
                    })
            }
        })
        
    /* button type */
    let type = sessionStorage.getItem('type');
    sessionStorage.setItem('type', '')
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then((data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data.name === type) {
                            $('.pkdex>.tab-type').append(`
                            <button id="defaultOpen" class="btn btn-${data.name}" onclick="opengen(event, '${data.name.toUpperCase()}')">${data.name.toUpperCase()}</button>
                            `)
                            $("#defaultOpen").click();
                        }
                        else {
                            $('.pkdex>.tab-type').append(`
                            <button class="btn btn-${data.name}" onclick="opengen(event, '${data.name.toUpperCase()}')">${data.name.toUpperCase()}</button>
                            `)
                        }
                    })
            }
        })

    /* ALL DEX */
    RenderPKM(1,899, 'ALL')

    $('form').on('submit', evt);
    async function evt(e) {
        e.preventDefault();
        let kt = 0;
        
        let strSearch = $('form input').val();
        strSearch = strSearch.toLowerCase();
        $('form input').val('');
        let blockBtn = document.getElementById('block-btn')
        let more_btn = document.querySelector('#SEARCH').querySelector('#more-btn');
        more_btn.style.display = "none";
                
        if (strSearch === '') {
            $('#SEARCH>.container>.row').empty();
            more_btn.style.display = "block";
            RenderPKM(1, 899, "SEARCH")
        }
        else {
            $('#SEARCH>.container>.row').empty();
            for (let i = 1; i < 899; i++) {
                if (i < 898) {
                    blockBtn.disabled = true;
                }
                else {
                    blockBtn.disabled = false;
                }

                let resp_pkm = await fetch(end_point_pkm.concat(`${i}`))
                let kq_pkm = await resp_pkm.json()
                if ((kq_pkm.name.search(strSearch) != -1) || (kq_pkm.id.toString().search(strSearch) != -1)) {
                    kt++;
                    let k = ktIDMore(kt, 12);
                    if (kt > 12) {
                        more_btn.style.display = "block";
                    }
                    if (kq_pkm.types.length === 1) {
                        if (kq_pkm.abilities.length === 1) {
                            OneTypeOneAbi(kq_pkm, 'SEARCH', k)
                        }
                        else {
                            OneTypeTwoAbi(kq_pkm, 'SEARCH', k)
                        }
                    }
                    else {
                        if (kq_pkm.abilities.length === 1) {
                            TwoTypeOneAbi(kq_pkm, 'SEARCH', k)
                        }
                        else {
                            TwoTypeTwoAbi(kq_pkm, 'SEARCH', k)
                        }
                    }
                }
            }
            if (kt === 0) {
                $('#SEARCH>.container>.row').empty();
                $('#SEARCH>.container>.row').append(`
                <div class="not-found">
                    NOT FOUND POKEMON </div>
                `)
            }
        }
    }
})