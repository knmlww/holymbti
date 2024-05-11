export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function b64toBlob(dataURI) {
    
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

export const getBrowser = () => {
    const browsers = [
      'Chrome', 'Opera',
      'WebTV', 'Whale',
      'Beonex', 'Chimera',
      'NetPositive', 'Phoenix',
      'Firefox', 'Safari',
      'SkipStone', 'Netscape', 'Mozilla',
    ];
  
    const userAgent = window.navigator.userAgent.toLowerCase();
  
    if (userAgent.includes("edg")) {
      return "Edge";
    }
  
    if (userAgent.includes("trident") || userAgent.includes("msie")) {
      return "Internet Explorer";
    }
  
    return browsers.find((browser) => userAgent.includes(browser.toLowerCase())) || 'Other';
}