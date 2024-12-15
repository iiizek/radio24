import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const NotFound = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace('/modal');
	}, []);
	return <></>;
};

export default NotFound;
