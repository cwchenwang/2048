function getNumColor(num) {
  if(num === 2 || num === 4) return "#776e65";
  else return "white";
}

function getNumBgColor(num) {
  switch(num) {
      case 2:
        return "#eff0c8";
      case 4:
        return "#efe4da";
      case 8:
        return "#f2bc79";
      case 16:
        return "#f59563";
      case 32:
        return "#f67c5f";
      case 64:
        return "#f65e3b";
      case 128:
        return "#edcf72";
      case 256:
        return "#98cd01";
      case 512:
        return "#33b5e5";
      case 1024:
        return "#0f98cd";
      case 2048:
        return "#ab56cd";
      case 4096:
        return "#983451";
      default:
        return "";
  }
}