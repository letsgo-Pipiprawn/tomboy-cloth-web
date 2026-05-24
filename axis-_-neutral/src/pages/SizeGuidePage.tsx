import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';

const blazerSizes = [
  { size: 'XS', chest: '82', shoulder: '42', length: '68' },
  { size: 'S', chest: '86', shoulder: '44', length: '70' },
  { size: 'M', chest: '92', shoulder: '46', length: '72' },
  { size: 'L', chest: '98', shoulder: '48', length: '74' },
  { size: 'XL', chest: '104', shoulder: '50', length: '76' },
];

export default function SizeGuidePage() {
  return (
    <main>
      <SeoHead
        title="Size Guide"
        description="How to measure for AXIS / NEUTRAL — chest, shoulder, length. All measurements in centimetres."
      />
      <PageHero
        label="Fit"
        title="Size Guide"
        subtitle="We measure like menswear: chest, shoulder, length. Compare a jacket you already wear."
      />
      <div className="max-w-3xl mx-auto px-8 md:px-16 py-20">
        <SectionLabel className="mb-6">How to measure</SectionLabel>
        <ul className="space-y-4 text-brand-light-slate text-sm mb-16">
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

        <SectionLabel className="mb-6">Oversized Charcoal Blazer (cm)</SectionLabel>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-brand-slate/30 text-xs uppercase tracking-widest text-brand-slate">
                <th className="py-4 pr-6">Size</th>
                <th className="py-4 pr-6">Chest</th>
                <th className="py-4 pr-6">Shoulder</th>
                <th className="py-4">Length</th>
              </tr>
            </thead>
            <tbody className="text-brand-light-slate">
              {blazerSizes.map((row) => (
                <tr key={row.size} className="border-b border-brand-slate/10">
                  <td className="py-4 pr-6 text-brand-white">{row.size}</td>
                  <td className="py-4 pr-6">{row.chest}</td>
                  <td className="py-4 pr-6">{row.shoulder}</td>
                  <td className="py-4">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-brand-slate text-sm mb-8">
          Between sizes? Size up for a more borrowed silhouette; size down for a cleaner line.
        </p>
        <Link
          to="/products/oversized-charcoal-blazer"
          className="text-xs uppercase tracking-widest border-b border-brand-slate pb-1 hover:text-brand-light-slate transition-colors"
        >
          Shop the blazer
        </Link>
      </div>
    </main>
  );
}
