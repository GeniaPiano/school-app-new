import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css'
import {mapLocations} from "../../utils/mapLocations";

export const Map = () => {
    return (
        <div  className="map" >
            <MapContainer center={[52.2322986,21.0058034]} zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {mapLocations.map(school => (
                    <Marker key={school.street} position={[school.lat, school.lon]}>
                        <Popup>
                            <h2>{school.city} {school.street}</h2>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

        </div>
    )
}