import { Icon } from "leaflet";
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerCurrent from "../marker/MarkerCurrent";
import lefterIcon from './images/leaf-green.png';
import './map.css';
import useCurrentLocation from "../hooks/useCurrentLocation";

function TestMap(props, ref) {

  const ZOOM_LEVEL = 9;
  const userLocation = useCurrentLocation()

  // custom hình ảnh cho icon
  const skater = new Icon({
    iconUrl: lefterIcon,// import hình ảnh của icon
    iconSize: [20, 50],// kích thước thật của icon này theo hình ảnh
    iconAnchor: [10, 50],//đây là size của icon khi zoom out and in, phải theo công thức x/2, y
  });

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  // tính khoảng cách giữa các điểm với nhau 
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Đường kính trái đất ở đơn vị kilometer
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Khoảng cách giữa hai điểm
    return distance;
  }

  // data fake cho những địa điểm trên bản đồ
  const data = [
    {
      userid: 1,
      position: [10.024758, 105.751575],
      role: 'shop'
    },
    {
      userid: 2,
      position: [10.026280, 105.750009],
      role: 'shop'
    },
    {
      userid: 3,
      position: [9.911397, 105.781294],
      role: 'shop'
    },
    {
      userid: 4,
      position: [10.040056, 105.764729],
      role: 'shop'
    },
    {
      userid: 5,
      position: [10.035999, 105.733400],
      role: 'shop'
    },
    {
      userid: 6,
      position: [10.024928, 105.737692],
      role: 'shop'
    },
    {
      userid: 7,
      position: [10.053389, 105.858052],
      role: 'shop'
    },
    {
      userid: 8,
      position: [10.088713, 105.820630],
      role: 'shop'
    },
    {
      userid: 9,
      position: [10.101388, 105.853074],
      role: 'shop'
    },
    {
      userid: 10,
      position: [10.100386, 105.547090],
      role: 'shop'
    }
  ]

  const filterLocationOverUser = data.filter(vl => {
    const [lat, long] = vl.position
    const distance = getDistanceFromLatLonInKm(userLocation.coordinate.lat, userLocation.coordinate.lng, lat, long)
    return distance <= 10
  })

  return (
    <>
      <MapContainer center={[14.0583, 108.2772]} zoom={13} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCurrent ref={ref} />
        {
          filterLocationOverUser.map((value, idx) => (
            <Marker position={value.position} icon={skater} key={idx}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </>
  )
}

// để sử dụng được ref chuyền từ cha sang con cần có forwardRef nhé, và sau đó ta sẽ sử dụng được useImperativeHandle
export default React.forwardRef(TestMap)
