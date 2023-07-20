let images = ['img/1.png', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.png', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg', 'img/13.jpg'];


function load(){
    for (let i = 0; i < images.length; i++){
        document.getElementById('photoSection').innerHTML += `
            <div onclick="openImages(${i})" class="imgbox"><img src="${images[i]}"></div>
        `;
    }
}


function openImages(i){
    document.getElementById('highlight').classList.remove('d-none');
    document.getElementById('showPhoto').innerHTML = `
    <div id="selected" class="photoFocus imgbox"><img  src="${images[i]}"></div>
    `;
    document.getElementById('selected').classList.remove('imgbox');
    document.getElementById('selected').classList.add('selected-image');
}


function closeImage(){
    document.getElementById('highlight').classList.add('d-none');
    document.getElementById('selected').classList.add('imgbox');
    document.getElementById('selected').classList.remove('selected-image');
}