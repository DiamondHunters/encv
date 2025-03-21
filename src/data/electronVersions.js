// dyn load from ./versions.json
async function loadElectronVersions() {
  let response;
  try {
    response = await fetch('https://raw.githubusercontent.com/DiamondHunters/encv/refs/heads/main/src/data/versions.json');    
  }catch(e){
    response = await fetch('./versions.json');
  }
  return await response.json();
}

export const electronVersions = await loadElectronVersions();
