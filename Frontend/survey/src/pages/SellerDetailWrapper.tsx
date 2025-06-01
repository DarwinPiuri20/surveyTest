import { useParams } from 'react-router-dom';
import SellerDetailPage from './SellerDetailPage';

const SellerDetailWrapper = () => {
    const { id } = useParams();

    if (!id) return <p>ID inválido</p>;

    return <SellerDetailPage sellerId={parseInt(id)} />;
};

export default SellerDetailWrapper;
