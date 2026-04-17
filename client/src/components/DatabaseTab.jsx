import ScrollReveal from './ScrollReveal';
import TrendChart from './TrendChart';
import ScoreDistribution from './ScoreDistribution';
import CategoryChart from './CategoryChart';
import ProductGrid from './ProductGrid';
import PerformanceTable from './PerformanceTable';
import ActivityLog from './ActivityLog';

function DatabaseTab({ products, scoreHistory, activityLog, prevScores, theme, onProductClick }) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ScrollReveal animation="fade-left" duration={900} className="lg:col-span-2">
          <TrendChart history={scoreHistory} theme={theme} />
        </ScrollReveal>
        <ScrollReveal animation="fade-right" duration={900} delay={100}>
          <ScoreDistribution products={products} theme={theme} />
        </ScrollReveal>
      </section>

      {/* Category Performance */}
      <ScrollReveal animation="scale-in" duration={800}>
        <CategoryChart products={products} theme={theme} />
      </ScrollReveal>

      {/* Product Catalog with Tabs */}
      <ScrollReveal animation="blur-in" duration={1000}>
        <ProductGrid products={products} onCardClick={onProductClick} />
      </ScrollReveal>

      {/* Rankings */}
      <ScrollReveal animation="fade-up" duration={900}>
        <PerformanceTable products={products} prevScores={prevScores} />
      </ScrollReveal>

      {/* Activity */}
      <ScrollReveal animation="fade-up" duration={800}>
        <ActivityLog entries={activityLog} />
      </ScrollReveal>
    </div>
  );
}

export default DatabaseTab;
