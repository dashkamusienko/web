class Gallery extends HTMLElement
{
    constructor()
    {
        super()
        const shadow = this.attachShadow({ mode: "open" });
        const div = this.getDiv("cust-gallery", "imgs-src");
        const style = this.getStyle();
        shadow.appendChild(div);
        shadow.appendChild(style);
    }

    getStyle()
    {
        const style = document.createElement("style");
        style.innerHTML = this.getStyleBody();
        return style;
    }

    getDiv(idValue, hasAttribute)
    {
        let div = document.createElement("div");
        div.setAttribute("class", idValue);
        if (this.hasAttribute(hasAttribute))
        {
            let imgs = this.getAttribute(hasAttribute).split(";");
            div = this.addImgs(imgs, div, "'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'");
        }

        return div;
    }

    addImgs(imgs, toAppend, defPic)
    {
        for (let img of imgs)
        {
            let wrapper = document.createElement("div");
            var image = document.createElement("img");
            wrapper.setAttribute("onclick", "handleFullscreen(this)");
            image.setAttribute("src", "./images/" + img);
            image.setAttribute("onerror", "this.src = " + defPic);
            image.setAttribute("onload", "handleImgSize(this)");
            wrapper.appendChild(image);
            toAppend.appendChild(wrapper);
        }
        return toAppend;
    }

    getStyleBody()
    {
        return `
        .cust-gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        .cust-gallery div {
            display: flex;
            overflow: hidden;
            align-items: center;
            justify-content: center;
            margin: 5px;
            width: 350px;
            height: 350px;
        }
        div .fullscreen {
            position: fixed;
            width: 100%;
            height: 100%;
            transition: all 1s ease-in
        }`;
    }
}

function handleImgSize(img)
{
    if (img.clientWidth < img.clientHeight)
        resizeImg(img, "auto", "90%");
    else
        resizeImg(img, "90%", "auto");
}

function resizeImg(img, height, width)
{
    img.style.height = height;
    img.style.width = width;
}

function handleFullscreen(div)
{
    if (div.getAttribute('class') !== 'fullscreen')
        div.setAttribute('class', 'fullscreen');
    else
        div.setAttribute('class', '');
}

customElements.define("cust-gallery", Gallery);
