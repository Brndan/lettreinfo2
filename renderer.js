const { remote } = require('electron')
const { dialog } = require('electron').remote

const ipc = electron.ipcRenderer

function recupFichier() {
    let pathFile = dialog.showOpenDialogSync(remote.getCurrentWindow(), {
        properties: ['openFile'],
        filters: [
            { name: 'HTML', extensions: ['html', 'xhtml'] }
        ]
    })
    document.getElementById("urlFichier").disabled = false
    document.getElementById("urlFichier").value = pathFile[0]
    document.getElementById("urlFichier").style.border = "thin solid green"
    document.getElementById("urlFichier").style.color = "green"
    document.getElementById("urlFichier").disabled = true
}



function convertirFichier() {
    const fs = require('fs')
    let cheminSortie = process.cwd() + '/lettreexport.html'
    let cheminFichier = document.getElementById("urlFichier").value
    let contenuFichier = null
    contenuFichier = fs.readFileSync(cheminFichier, 'utf8')
    contenuFichier = minifie(contenuFichier)
    contenuFichier = supprimeTrackers(contenuFichier)
    document.getElementById("afficheHtml").readonly = false
    document.getElementById("afficheHtml").textContent = contenuFichier
    document.getElementById("afficheHtml").readonly = false
    fs.writeFile(cheminSortie, contenuFichier, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

function pressePapier() {
    let copieTexte = document.querySelector("#afficheHtml");
    copieTexte.select();
    document.execCommand("copy");
}

function supprimeTrackers(contenuFichier) {
    const stripHtml = require("string-strip-html");
    contenuFichier = stripHtml(contenuFichier, { onlyStripTags: ["script", "meta", "title"], stripTogetherWithTheirContents: ["script","title"] })
    //contenuFichier = contenuFichier.replace(/<title>.*title>/, "<title>Lettre de SUD éducation</title>")
    contenuFichier = contenuFichier.replace(/<link.*archivebar-desktop.*$/m, "")
    //contenuFichier = contenuFichier.replace(/<.?doctype.*>/i,"")
    //contenuFichier = contenuFichier.replace(/<a.*Voir ce mail dans votre navigateur<\/a>/, '<a href="https://www.sudeducation.org/-La-lettre-d-info-.html" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #656565;font-weight: normal;text-decoration: underline;')
    return contenuFichier
}

function minifie(contenuFichier) {
    const CleanCSS = require('clean-css');
    const minify = require('html-minifier').minify;
    contenuFichier = minify(contenuFichier, {
        minifyCSS: true,
    });
    return contenuFichier
}

function aPropos() {
    versionLettreinfo = `Lettreinfo version 2.0.5
Node.js ${process.versions.node}
Chrome ${process.versions.chrome}
Electron ${process.versions.electron}
`;
    document.getElementById("afficheHtml").readonly = false
    document.getElementById("afficheHtml").textContent = versionLettreinfo
    document.getElementById("afficheHtml").readonly = false
}

