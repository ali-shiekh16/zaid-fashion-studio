import { Container } from '@/components/layout/container';
import LineChart5 from '@/components/line-chart-5';
import StatisticCard1 from '@/components/statistic-card-1';

export default function Page() {
  return (
    <Container className='space-y-5'>
      <StatisticCard1 />
      <LineChart5 />
    </Container>
  );
}
