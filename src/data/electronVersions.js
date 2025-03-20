// dyn load from ./versions.json
async function loadElectronVersions() {
  const response = await fetch('./versions.json');
  return await response.json();
}

export const electronVersions = await loadElectronVersions();
