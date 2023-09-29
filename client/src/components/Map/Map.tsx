import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css'

export const Map = () => {
    return (
        <div  className="map" >
            <MapContainer center={[52.2322986,21.0058034]} zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

            </MapContainer>

        </div>
    )
}