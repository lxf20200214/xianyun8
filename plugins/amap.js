/*
 * 异步创建script标签
 */
export default function MapLoader(key) {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "http://webapi.amap.com/maps?v=2.0&callback=initAMap&key=5dbb2cb340f1762872633fdea0e391c9&plugin=AMap.CitySearch";
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}
