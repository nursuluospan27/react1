import {useEffect, useState} from "react";
import './HttpApp.css'

const url = 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=31c6a431b77159b2e385bc83d1be07db&format=json&limit=10&page=1';

export type Track = {
    name: string,
    playcount: number,
    listeners: number,
    mbid: string
}

export type ApiResponse = {
    toptracks: {
        track: Track[]
    }
}

export function HttpApp(){
    const [tracks, setTracks] = useState<Track[]>([]);
    const [trackNameValue, setTrackNameValue] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then((data: ApiResponse) => setTracks(data.toptracks.track))
    }, []);

    function handleFindTrack(e: React.SubmitEvent){
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        fetch(url +"&artist=" + trackNameValue)
            .then(resp => resp.json())
            .then((data: ApiResponse) => setTracks(data.toptracks.track))
            .catch(() => { setIsError(true) })
            .finally(() => {
                setTrackNameValue('');
                console.log("trackNameValue: ", trackNameValue);
                setIsLoading(false);
            })

    }
    return (
        <div className={'main'}>
            <h1>Music Finder</h1>
            <form onSubmit={handleFindTrack} className={'form'}>
                <input
                    type="text"
                    required={true}
                    value={trackNameValue}
                    minLength={2}
                    disabled={isLoading}
                    onChange={(e)=> setTrackNameValue(e.target.value)}
                />
                <button disabled={isLoading}>Find</button>
            </form>

            <div className={'list'}>
                { isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Something went wrong</div>
                ) : (
                    tracks.length === 0
                        ? <div>List is empty</div>
                        :
                    <table>
                        <tr>
                            <th>Name</th>
                        </tr>
                        {
                            tracks.map(track => (
                                <tr>
                                    <td key={track.mbid || track.name}>
                                        {track.name} - {track.playcount}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                )}
            </div>
        </div>
    )
}