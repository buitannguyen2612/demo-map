import React, { useImperativeHandle, forwardRef } from 'react'
import useCurrentLocation from '../hooks/useCurrentLocation'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';

function MarkerCurrent(props, ref) {

    const map = useMap()
    const currrentLocation = useCurrentLocation()
    const radius = 10000

    // Thêm vào maps một circle với vị trí tâm là vị trí của user
    const circle = L.circle([currrentLocation.coordinate.lat, currrentLocation.coordinate.lng], {
        color: '#9BB8CD',
        fillColor: '#9BB8CD',
        fillOpacity: 0.06,
        radius: radius,
    }).addTo(map);


    const viewToLocation = () => {
        if (currrentLocation.loaded && !currrentLocation.error) {
            map.flyTo([currrentLocation.coordinate.lat, currrentLocation.coordinate.lng], 10)
        }
        else {
            alert(currrentLocation.error.message)
        }
    }

    // hàm này là 1 hook, nó sẽ giúp mình handel ref truyền từ cha sang con, kéo xuông dòng cuối
    useImperativeHandle(ref, () => {
        return {
            locationUser: () => viewToLocation()
        }
    })

    return (
        <>
            {
                currrentLocation.loaded && !currrentLocation.error && (
                    <Marker position={[currrentLocation.coordinate.lat, currrentLocation.coordinate.lng]} >
                        <Popup>
                            This is ur place
                        </Popup>
                    </Marker>
                )
            }
        </>
    )
}

export default React.forwardRef(MarkerCurrent)