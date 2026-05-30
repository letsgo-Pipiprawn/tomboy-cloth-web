import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import { getProductCopy } from '../data/productCopy';

const blazerCopy = getProductCopy('black-double-breasted-chain-blazer-6754');
const blazerSizes =
  blazerCopy?.sizeChart.map((row) => ({
    size: row.size,
    chest: '—',
    shoulder: '—',
    length: row.length,
  })) ?? [];

export default function SizeGuidePage() {
  return (
    <main>
      <SeoHead
        title="Size Guide"
        description="How to measure for AXIS / NEUTRAL — chest, shoulder, length. All measurements in centimetres."
        path="/size-guide"
      />
      <PageHero
        label="Fit"
        title="Size Guide"
        subtitle="We measure like menswear: chest, shoulder, length. Compare a jacket you already wear."
      />
      <div className="container-narrow section-content">
        <SectionLabel className="mb-6">How to measure</SectionLabel>
        <ul className="space-y-5 type-body-lg text-brand-light-slate mb-16 md:mb-20">
          <li>
            <strong className="text-brand-white font-medium">Chest:</strong> Under arms, around
            fullest part of chest.
          </li>
          <li>
            <strong className="text-brand-white font-medium">Shoulder:</strong> Seam to seam across
            the back.
          </li>
          <li>
            <strong className="text-brand-white font-medium">Length:</strong> Centre back neck to hem.
          </li>
        </ul>

        <SectionLabel className="mb-6">Chain Blazer · back length (cm)</SectionLabel>
        <div className="overflow-x-auto mb-14">
          <table className="w-full type-body text-left">
            <thead>
              <tr className="border-b border-brand-slate/30 type-label text-brand-slate">
                <th className="py-4 pr-8 font-medium">Size</th>
                <th className="py-4 pr-8 font-medium">Chest</th>
                <th className="py-4 pr-8 font-medium">Shoulder</th>
                <th className="py-4 font-medium">Length</th>
              </tr>
            </thead>
            <tbody className="text-brand-light-slate">
              {blazerSizes.map((row) => (
                <tr key={row.size} className="border-b border-brand-slate/10">
                  <td className="py-4 pr-8 text-brand-white">{row.size}</td>
                  <td className="py-4 pr-8">{row.chest}</td>
                  <td className="py-4 pr-8">{row.shoulder}</td>
                  <td className="py-4">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="type-body text-brand-slate mb-10">
          Between sizes? Size up for a more borrowed silhouette; size down for a cleaner line.
        </p>
        <Link
          to="/collections/all"
          className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-light-slate transition-colors"
        >
          View shop
        </Link>
      </div>
    </main>
  );
}
