
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function SkeletonComponent() {
    return (
        <Skeleton count={50} /> // Five-line loading skeleton
    );
}
