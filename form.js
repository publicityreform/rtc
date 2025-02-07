// todo: 
// - autopopulate select menu
// - integrate random ID generation per each container
// 


const main = document.getElementById("main");
const index = document.getElementById('index');
const requestURL = "RTC.json";

let request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  const rtc = request.response;
  popMenu(rtc);
  showWorks(rtc);  
};


function popMenu(obj) {
index.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'jump to...';
defaultOption.value = '#';

index.add(defaultOption);
index.selectedIndex = 0;
  let option;
    for (let i = 0; i < obj.length; i++) {
      option = document.createElement('option');
      option.text = obj[i].title;
      option.value = "#" + obj[i].id;
      index.add(option);
    }
}

index.onchange = function(){
  document.location.href=this.value;
  index.selectedIndex = 0;
}

function showWorks(obj) {

  for (let i = 0; i < obj.length; i++) {
    let container = document.createElement("div");
    container.classList.add("container");
    container.id = obj[i].id;

    let containerTxt = document.createElement("div");
    containerTxt.classList.add("container-inner-txt");

    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = obj[i]["title"];

    let year = document.createElement("div");
    year.classList.add("year");
    year.textContent = obj[i]["year"];

    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.textContent = obj[i]["artist"];

    let desc = document.createElement("div");
    desc.classList.add("description");
    desc.innerHTML = obj[i]["description"];

    let attr = document.createElement("span");
    attr.classList.add("attr");
    attr.innerHTML = obj[i]["attr"];

    // layout html

    // make link container div
    let link = document.createElement("div");
    link.classList.add("link");

    // make any link elements
    let links = obj[i]["links"];
    for (let i = 0; i < links.length; i++) {
      let linka = document.createElement("a");
      linka.href = links[i];
      link.appendChild(linka);
    }

    // make image container div
    let containerImg = document.createElement("div");
    containerImg.classList.add("container-inner-media");

    // make any image elements
    let images = obj[i]["images"];

    for (let i = 0; i < images.length; i++) {
      let figure = document.createElement("figure");
      let figcaption = document.createElement("figcaption");
      let img = document.createElement("img");

      img.src = images[i].link;
      figcaption.innerHTML = images[i].caption;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      containerImg.appendChild(figure);
    }

    // make any video elements
    let videos = obj[i]["videos"];

    for (let i = 0; i < videos.length; i++) {
      let figure = document.createElement("figure");
      let figcaption = document.createElement("figcaption");
      let video = document.createElement("video");
      let source = document.createElement("source");
      video.controls = true;
      source.src = videos[i].link;
      figcaption.textContent = videos[i].caption;

      video.appendChild(source);
      figure.appendChild(video);
      figure.appendChild(figcaption);
      containerImg.appendChild(figure);
    }

    // make any iframe elements

    let embeds = obj[i]["embeds"];
    for (let i = 0; i < embeds.length; i++) {
      let figure = document.createElement("figure");
      let figcaption = document.createElement("figcaption");
      let ifc = document.createElement("div");
      ifc.classList.add("iframecontainer");
      ifc.innerHTML = embeds[i].html;

      figcaption.textContent = embeds[i].caption;
      figure.appendChild(ifc);
      figure.appendChild(figcaption);
      containerImg.appendChild(figure);
    }

    // make any audio elements
    let audios = obj[i]["audios"];

    for (let i = 0; i < audios.length; i++) {
      let figure = document.createElement("figure");
      let figcaption = document.createElement("figcaption");
      let audio = document.createElement("audio");
      let source = document.createElement("source");
      audio.controls = true;

      source.src = audios[i].link;
      figcaption.textContent = audios[i].caption;
      audio.appendChild(source);
      figure.appendChild(audio);
      figure.appendChild(figcaption);
      containerImg.appendChild(figure);
    }

    containerTxt.appendChild(title);
    containerTxt.appendChild(year);
    containerTxt.appendChild(artist);
    containerTxt.appendChild(desc);
    desc.appendChild(attr);
    containerTxt.appendChild(link);

    container.appendChild(containerTxt);
    container.appendChild(containerImg);

    main.appendChild(container);
  }
}
