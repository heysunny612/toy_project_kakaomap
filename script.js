(function () {
  'use strict';

  const shops = [
    {
      id: 1292273001,
      name: '매콤돈가스&칡불냉면 판교점',
      lat: 37.40189834738935,
      lng: 127.10624455094185,
    },
    {
      id: 1151112822,
      name: '탄탄면공방 판교테크노밸리점',
      lat: 37.40193038525563,
      lng: 127.11060980539878,
    },
    {
      id: 15775065,
      name: '파리바게뜨 판교테크노점',
      lat: 37.40133360873933,
      lng: 127.10801128231743,
    },
  ];

  const defaultPosition = {
    lat: 37.4020589,
    lng: 127.1064401,
  };

  const get = (target) => {
    return document.querySelector(target);
  };
  const $map = get('#map');
  const $geoLocationButton = get('.geolocation_button');

  const mapContainer = new kakao.maps.Map($map, {
    center: new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
    level: 4,
  });

  const createMakerImage = () => {
    const markerImageSrc = './assets/marker.png';
    const imageSize = new kakao.maps.Size(30, 46);
    return new kakao.maps.MarkerImage(markerImageSrc, imageSize);
  };

  const createMaker = (lat, lng) => {
    const marker = new kakao.maps.Marker({
      map: mapContainer, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(lat, lng), // 마커를 표시할 위치
      image: createMakerImage(), // 마커 이미지
    });
    return marker;
  };

  const createShopElement = () => {
    shops.map((shop) => {
      const { id, name, lat, lng } = shop;
      const marker = createMaker(lat, lng);
      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div class="badge"><a href="https://place.map.kakao.com/${id}" target="_blank">${name}</a></div>`,
      });
      infoWindow.open(mapContainer, marker);
    });
  };

  const errorGeo = (error) => {
    switch (error.code) {
      case 1:
        alert('위치 정보를 허용해주세요');
        break;
      case 2:
        alert('사용할 수 없는 위치입니다.');
        break;
      case 3:
        alert('타임아웃이 발생하였습니다 ');
        break;
      default:
        alert('오류가 발생하였습니다.');
    }
  };

  const successGeo = (position) => {
    const { latitude, longitude } = position.coords;
    mapContainer.setCenter(new kakao.maps.LatLng(latitude, longitude));
    const marker = createMaker(latitude, longitude);
    marker.setMap(mapContainer);
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    } else {
      alert('지도 API 사용불가');
    }
  };

  const init = () => {
    $geoLocationButton.addEventListener('click', getLocation);
    createShopElement();
  };

  init();
})();
