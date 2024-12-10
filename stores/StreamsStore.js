import { create } from 'zustand';

const useStreamsStore = create((set) => ({
	streams: null,
	setStreams: (streams) => set({ streams }),
}));

export default useStreamsStore;
