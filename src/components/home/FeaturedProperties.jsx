import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProperties } from '../../context/PropertyContext';
import { useFavorites } from '../../context/FavoriteContext';
import { useUI } from '../../context/UIContext';
import PropertyCard from '../property/PropertyCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedProperties = () => {
  const { featuredProperties: properties, loading } = useProperties();
  const { toggleFavorite, isFavorited } = useFavorites();
  const { showToast } = useUI();

  const handleFavoriteToggle = async (propertyId) => {
    const result = await toggleFavorite(propertyId);
    if (result.success) {
      if (isFavorited(propertyId)) {
        showToast('Removed from favorites', 'info');
      } else {
        showToast('Added to favorites', 'success');
      }
    } else {
      showToast(result.error || 'Failed to update favorite', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Featured Properties
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Discover handpicked premium properties that offer exceptional value and unique features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onFavorite={handleFavoriteToggle}
                isFavorited={isFavorited(property.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;