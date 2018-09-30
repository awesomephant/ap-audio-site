const gra = function (min, max) {
    return Math.random() * (max - min) + min;
}

const gri = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let positions = []
const config = {
    minVerticalDistance: 6,
    minHorizontalDistance: 20,
}

// Below a nice piece of recursion
const findPosition = function () {
    let minDistance = {
     x: 9999,
     y: 9999
    };
    var position = [gra(0, 80), gra(0, 80)]

    for (let i = 0; i < positions.length; i++) {
        let dx = Math.abs(positions[i][0] - position[0])
        let dy = Math.abs(positions[i][1] - position[1])
        if (dx < minDistance.x) {
            minDistance.x = dx;
        }
        if (dy < minDistance.y) {
            minDistance.y = dy;
        }
    }
    if (minDistance.x < config.minHorizontalDistance && minDistance.y < config.minVerticalDistance) {
        return findPosition();
    } else {
        console.log('Distance ' + minDistance.x + ';' + minDistance.y +  ' is good.')
        console.log('Distance X: ' + minDistance.x + '; Y: ' + minDistance.y + ' is too small, rolling again.')
        positions.push(position)
        return position;
    }
}

const distributeTracks = function () {
    console.log('Distributing Tracks')
    let tracks = document.querySelectorAll('.tracks-item');
    let tracks_l = tracks.length;
    for (let i = 0; i < tracks_l; i++) {
        let track = tracks[i];
        let pos = findPosition();
        track.style.left = pos[0] + 'vw';
        track.style.top = pos[1] + 'vh';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    distributeTracks();
})
