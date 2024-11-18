class RadioStream {
	constructor(index, stream, artist, title) {
		this.id = index;
		this.listenUrl = stream.listenurl;
		this.listeners = stream.listeners;
		this.serverUrl = stream.server_url;
		this.genre = null;
		this.serverDescription = null;
		this.serverName = null;
		this.artist = artist?.trim();
		this.title = title?.trim();
		this.coverUrl = `URL_ОБЛОЖКИ`;
	}
}

export default RadioStream;
