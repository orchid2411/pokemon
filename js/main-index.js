$(document).ready(() => {

    /* Pokedex */
    const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then((data) => {
            const result_pkm = data.count-220;
            const pkm = [];
            pkm[0] = Math.floor(Math.random() * result_pkm)+1;
            for (let i = 1; i < 9; i++) {
                let temp = Math.floor(Math.random() * result_pkm)+1;
                for (let j = 0; j < i; j++) {
                    if (pkm[j] != temp) {
                        pkm[i] = temp;
                    }
                    else {
                        i--;
                        break;
                    }
                }
            }

            let tempdem = 0;
            for (let k = 0; k < 9; k++) {
                fetch(end_point_pkm.concat(`${pkm[k]}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        tempdem++;
                        let tamid = data.id;
                        if (data.id < 10) {
                            tamid = `00${data.id}`
                        }
                        if ((data.id >= 10) && (data.id < 100)) {
                            tamid = `0${data.id}`
                        }
                        if (tempdem === 9) {
                            $('.center')
                            .not('.slick-initialized')
                            .slick({
                                centerMode: true,
                                infinite: true,
                                slidesToShow: 5,
                                speed: 400,
                                variableWidth: false,
                                responsive: [
                                    {
                                        breakpoint: 1200,
                                        settings: {
                                            arrows: true,
                                            centerMode: true,
                                            slidesToShow: 3
                                        }
                                    },
                                    {
                                        breakpoint: 576,
                                        settings: {
                                            arrows: false,
                                            centerMode: true,
                                            slidesToShow: 1
                                        }
                                    }
                                ]
                            })
                        }
                        else {
                            if (data.types.length === 1) {
                                if (data.abilities.length === 1) {
                                    $('.center').append(`
                                    <div>
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex">
                                                    <a href="#" class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>`)
                                }
                                else {
                                    $('.center').append(`
                                    <div>
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex">
                                                    <a href="#" class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>`)

                                }
                            }
                            else {
                                if (data.abilities.length === 1) {
                                    $('.center').append(`
                                    <div>
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex">
                                                    <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                    <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>`)
                                }
                                else {
                                    $('.center').append(`
                                    <div>
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex">
                                                    <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                    <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>`)
                                }
                            }
                        }
                    })
            }
        })

    /* Pokemovie */
    const dlmovie = $.getJSON("../js/movie.json", function () {
        const mv = [];
        mv[0] = Math.floor(Math.random() * dlmovie.responseJSON.length);
        for (let i = 1; i < 7; i++) {
            let temp = Math.floor(Math.random() * dlmovie.responseJSON.length);
            for (let j = 0; j < i; j++) {
                if (mv[j] != temp) {
                    mv[i] = temp;
                }
                else {
                    i--;
                    break;
                }
            }
        }
        for (let i = 0; i < 7; i++) {
            $('.movie').append(`
                <div class="d-flex flex-column">
                    <img src="${dlmovie.responseJSON[mv[i]].image}" alt="...">
                    <div>
                        <p>MOVIE ${dlmovie.responseJSON[mv[i]].id}</p>
                        <p>${dlmovie.responseJSON[mv[i]].name.toUpperCase()}</p>
                    </div>
                </div>`)
        }
        $('.movie').slick({
            centerMode: true,
            infinite: true,
            slidesToShow: 3,
            speed: 800,
            variableWidth: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }) 

    /* Pokegame */
    const end_point_game = 'https://pokeapi.co/api/v2/version/';
    const game = [21, 23, 15, 25]
    for (let i = 0; i < 4; i++) {
        fetch(end_point_game.concat(`${game[i]}`))
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                $(".game>.row").append(`
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                        <img src="https://img.pokemondb.net/boxes/${data.name}.jpg" alt="">
                        <p>POKEMON ${data.name.toUpperCase()}</p>
                    </div>`)
            })
    }
    
    /* PokeShop */
    const dlshop = $.getJSON("../js/products.json", function () {
        const prduct = [];
        prduct[0] = Math.floor(Math.random() * dlshop.responseJSON.length);
        console.log(dlshop)
        for (let i = 1; i < 4; i++) {
            let temp = Math.floor(Math.random() * dlshop.responseJSON.length);
            for (let j = 0; j < i; j++) {
                if (prduct[j] != temp) {
                    prduct[i] = temp;
                }
                else {
                    i--;
                    break;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            $(".shop>.row").append(`
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div class="img-pos">
                            <img src="${dlshop.responseJSON[prduct[i]].imgfull[1]}" class="img-hid-1">
                            <img src="${dlshop.responseJSON[prduct[i]].imgfull[2]}" class="img-hid-2">
                        </div>
                            <p>${dlshop.responseJSON[prduct[i]].name}</p>
                    </div>`)
        }
    })  

    /* PokeNews */
    const dlnews = $.getJSON("../js/news.json", function () {
        const news = [];
        news[0] = Math.floor(Math.random() * dlnews.responseJSON.length);
        console.log(dlnews)
        for (let i = 1; i < 4; i++) {
            let temp = Math.floor(Math.random() * dlnews.responseJSON.length);
            for (let j = 0; j < i; j++) {
                if (news[j] != temp) {
                    news[i] = temp;
                }
                else {
                    i--;
                    break;
                }
            }
        }
        console.log(news)
        for (let i = 0; i < 4; i++) {
            $(".news>.row").append(`
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 news-item nav-${dlnews.responseJSON[news[i]].type}">
                    <div class="card__header d-flex nav-item">
                        <img src="../images/pokeball.png" alt="" class="icon-new">
                        <span>${dlnews.responseJSON[news[i]].type.toUpperCase()}</span>
                    </div>
                    <img src="${dlnews.responseJSON[news[i]].image}" alt="">
                    <div class="card__mid nav-item"></div>
                    <div class="card__bot">
                        <p>${dlnews.responseJSON[news[i]].content}</p>
                        <span>${dlnews.responseJSON[news[i]].date}</span>
                    </div>
                </div>`)
        }
    })  
})