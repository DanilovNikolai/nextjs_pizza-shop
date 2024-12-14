'use client';

import dynamic from 'next/dynamic';

const AddressInputNoSSR = dynamic(() => import('./AddressInput'), { ssr: false });

export default AddressInputNoSSR;
