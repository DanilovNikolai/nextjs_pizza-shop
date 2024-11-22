import React from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params: { id } }) => {
  return <div>ProductPage {id}</div>;
};

export default ProductPage;
