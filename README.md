# 토이프로젝트 카카오맵 API 
- 카카오맵 API <br/>
- WEB APT : Geolocation 사용하여, 현재 위치 가져오기

<p align="center">
    <img src="https://user-images.githubusercontent.com/127499117/235601494-963880eb-ad1e-45e0-8ee9-57bc15c33d8c.gif" alt="Animation12">
</p>

>회사 홈페이지등 지도가 필요로한 페이지에서 유용하게 사용할 수 있는 카카오맵 API를 사용해보았고, 카카오맵 API에서 기본적으로 제공해주는 여러가지 메서드들을 확인해보았다. 그리고 브라우저에서 제공해주는 geolocation API도 사용해 볼 수 있었다.

<br/>
<br/>

## 새로 배운 것들

 <br/>

```js
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
```
<br/>

## switch
- 정의: switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮긴다. case문은 상황을 의미하는 표현식을 지정하고 콜론으로 마친다. swich 문의 표현식과 일치하는 case문이 없다면, 실행 순서는 default 문으로 이동한다. default 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수 도 있다. 

<br/>

- 사용: if...else 문의 조건식은 불리업 값으로 평가되어야 하지만, swich 문의 표현식은 불리언 값보다는 "문자열"이나 "숫자"값인 경우가 많다. 다시 말해, if...else문은 논리적 참, 거짓으로 실행할 코드 블록을 결정한다. swich문은 논리적 참, 거짓 보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용하므로, geolocation은 오류를 총3가지의 경우(case)로 반환하므로 if...else가아닌 swich문을 사용했다.

## Geolocation API

- Geolocation API는 사용자의 동의 하에 웹 애플리케이션에서 위치 정보에 접근할 수 있는 API이다.  개인정보 보호를 위해, 브라우저는 위치 정보를 제공하기 전에 사용자에게 위치 정보 권한에 대한 확인을 받는다. navigator.geolocation.getCurrentPosition()으로  장치의 현재 위치를 가져온다. getCurrentPosition() 메서드는 성공 콜백과 오류 콜백이라는 두 개의 콜백 함수를 인수로 사용한다. 성공 했다면, position.croords.latitude,  position.croords.longitude 로 위도, 경도를 받을 수 있고, 실패했다면 3가지의 오류를 받을 수 있다. (1.사용권한 거부 2. 위치를 받을수없음 3. 시간초과)

