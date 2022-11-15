let search_input = document.getElementById("search-input-link")
let search_btn = document.getElementById("search-btn-arrow")
let select_theme = document.getElementById("select-theme")
let fav_add = document.getElementById("fav-btn-add")

let modal_bg = document.getElementById("modal-add")
let modal_input_link = document.getElementById("modal-input-link")
let modal_input_img = document.getElementById("modal-input-img")

let fav_list = document.getElementById("fav-list")
var r = document.querySelector(':root')
var list = []

var default_list = {
    "favs": [
        {img: "./assets/Google.png",        link: "https://www.google.com"},
        {img: "./assets/Youtube.png",       link: "https://www.youtube.com"}
    ],
    "theme": "default"
}

if (localStorage.getItem('fav') !== null) {
    list = JSON.parse(localStorage.getItem('fav')).favs
    select_theme.value = JSON.parse(localStorage.getItem('fav')).theme
} else {
    localStorage.setItem('fav', JSON.stringify(default_list))
    list = default_list.favs
    select_theme.value = JSON.parse(localStorage.getItem('fav')).theme
}

RefreshFav()
Change_Theme()









function AddFavLink() {
    let allfav = JSON.parse(localStorage.getItem('fav'))
    allfav.favs.push({"img": modal_input_img.value, "link": modal_input_link.value})
    localStorage.setItem('fav', JSON.stringify(allfav))
    list.push({"img": modal_input_img.value, "link": modal_input_link.value})
    RefreshFav()
}

function ShowModalAdd() {
    console.log("show")
    if (modal_bg.style.display == "none") {
        modal_bg.style.display = "block"
    } else {
        modal_bg.style.display = "none"
    }
}

search_btn.addEventListener("click", () => {
    let text = search_input.value
    if (text.includes("://")) {
        window.open(text)
    } else {
        window.open(`https://www.google.com/search?q=${text}`)
    }
})

search_input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search_btn.click();
    }
})

select_theme.addEventListener("change", () => {
    Change_Theme()
})

function RefreshFav() {
    fav_list.innerHTML = ''
    for (let el of list) {
        let link = document.createElement("a")
        link.classList.add("style-default", "fav-btn")
        link.href = el.link
        link.target = "blank"
        
        let img = document.createElement("img")
        img.src = el.img

        let del = document.createElement("img")
        del.classList.add("fav-btn-del")
        del.src = "./assets/arrow.png"

        link.append(del)
        link.append(img)
        fav_list.append(link)
    }
    let b = document.createElement("a")
    b.classList.add("style-default", "fav-btn", "fav-btn-add")
    b.id = "fav-btn-add"
    b.onclick = ShowModalAdd
    
    let i = document.createElement("img")
    i.src = "./assets/add.png"

    b.append(i)
    fav_list.append(b)

    oncontextmenu="javascript:Del;return false;"
}

function Change_Theme() {

    theme = JSON.parse(localStorage.getItem('fav'))
    theme.theme = select_theme.value
    localStorage.setItem('fav', JSON.stringify(theme))

    switch (select_theme.value) {
        case "default":
            c_princ = "#ca00ca"
            c_secon = "#ff1aff"
            c_bg    = "#31202b"
            break
        case "red":
            c_princ = "#ca0000"
            c_secon = "#ff1a1a"
            c_bg    = "#312020"
            break
        case "green":
            c_princ = "#40ca00"
            c_secon = "#40ff1a"
            c_bg    = "#203120"
            break
        case "blue":
            c_princ = "#0000ca"
            c_secon = "#1a1aff"
            c_bg    = "#202031"
            break
        case "azur":
            c_princ = "#008bd6"
            c_secon = "#37b9ff" //008bd6 37b9ff 202931
            c_bg    = "#202931"
            break
        default:
            c_princ = "#ca00ca"
            c_secon = "#ff1aff"
            c_bg    = "#31202b"
    }
    r.style.setProperty('--clr-princ', c_princ)
    r.style.setProperty('--clr-secon', c_secon)
    r.style.setProperty('--clr-bg', c_bg)

    
    document.cookie = `theme=${select_theme.value}`
    console.log()
}
