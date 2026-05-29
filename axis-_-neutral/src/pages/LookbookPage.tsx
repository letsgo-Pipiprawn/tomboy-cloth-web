import SeoHead from '../components/SeoHead';
import PageHero from '../components/PageHero';
import EditorialLookbook from '../components/EditorialLookbook';

export default function LookbookPage() {
  return (
    <main id="content">
      <SeoHead
        title="Lookbook"
        description="AXIS / NEUTRAL AW26 lookbook — androgynous city tailoring, editorial photography from Melbourne."
        path="/lookbook"
      />
      <PageHero
        label="Campaign"
        title="AW26 Lookbook"
        subtitle="Structure first. Neutrals only. From mood board to garment."
      />
      <EditorialLookbook />
    </main>
  );
}
