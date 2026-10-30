import { services } from '../data'
import { ServiceCard } from '../components/Cards'
import { PageHead } from '../components/ui'
export default function Services() {
  return <><PageHead title="Medical Services" text="Pick a specialty and continue to booking with it already selected." />
    <section className="sec"><div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(s => <ServiceCard key={s.id} s={s} />)}</div></section></>
}
