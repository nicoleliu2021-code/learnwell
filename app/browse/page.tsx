'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TutorCard } from '@/components/tutor/TutorCard'
import { SUBJECTS, AGE_GROUPS } from '@/lib/constants'
import { fetchTutors, searchTutors } from '@/lib/api/tutors'
import { TutorProfile, SearchFilters, AgeGroup, LocationType } from '@/types'
import { Search, Star } from 'lucide-react'

function BrowsePageContent() {
  const searchParams = useSearchParams()
  const [tutors, setTutors] = useState<TutorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState('rating')

  // Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([])
  const [locationType, setLocationType] = useState<string>('all')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [minRating, setMinRating] = useState<number>(0)
  const [backgroundCheckOnly, setBackgroundCheckOnly] = useState(false)

  // Fetch tutors when filters change
  useEffect(() => {
    loadTutors()
  }, [selectedSubjects, selectedAgeGroups, locationType, priceMin, priceMax, zipCode, minRating, backgroundCheckOnly])

  // Search when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch()
    } else {
      loadTutors()
    }
  }, [searchQuery])

  const loadTutors = async () => {
    try {
      setLoading(true)
      const filters: SearchFilters = {
        subjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
        age_groups: selectedAgeGroups.length > 0 ? selectedAgeGroups : undefined,
        location_type: locationType !== 'all' ? locationType as LocationType : undefined,
        price_min: priceMin ? parseFloat(priceMin) : undefined,
        price_max: priceMax ? parseFloat(priceMax) : undefined,
        zip_code: zipCode || undefined,
        min_rating: minRating > 0 ? minRating : undefined,
        has_background_check: backgroundCheckOnly || undefined,
      }

      const data = await fetchTutors(filters)
      setTutors(sortTutors(data, sortBy))
    } catch (error) {
      console.error('Error loading tutors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadTutors()
      return
    }

    try {
      setLoading(true)
      const data = await searchTutors(searchQuery)
      setTutors(sortTutors(data, sortBy))
    } catch (error) {
      console.error('Error searching tutors:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortTutors = (tutorList: TutorProfile[], sortType: string) => {
    const sorted = [...tutorList]
    switch (sortType) {
      case 'rating':
        return sorted.sort((a, b) => b.rating_average - a.rating_average)
      case 'reviews':
        return sorted.sort((a, b) => b.review_count - a.review_count)
      case 'price-low':
        return sorted.sort((a, b) => a.hourly_rate - b.hourly_rate)
      case 'price-high':
        return sorted.sort((a, b) => b.hourly_rate - a.hourly_rate)
      default:
        return sorted
    }
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setTutors(sortTutors(tutors, newSort))
  }

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    )
  }

  const toggleAgeGroup = (age: AgeGroup) => {
    setSelectedAgeGroups(prev =>
      prev.includes(age)
        ? prev.filter(a => a !== age)
        : [...prev, age]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedSubjects([])
    setSelectedAgeGroups([])
    setLocationType('all')
    setPriceMin('')
    setPriceMax('')
    setZipCode('')
    setMinRating(0)
    setBackgroundCheckOnly(false)
  }

  const hasActiveFilters =
    selectedSubjects.length > 0 ||
    selectedAgeGroups.length > 0 ||
    locationType !== 'all' ||
    priceMin !== '' ||
    priceMax !== '' ||
    zipCode !== '' ||
    minRating > 0 ||
    backgroundCheckOnly

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Tutor</h1>
          <p className="text-gray-600">
            Browse vetted tutors and teachers in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by subject, name, or keyword..."
              className="flex-1 outline-none text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Subjects */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Subject
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {SUBJECTS.map((subject) => (
                      <label key={subject} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(subject)}
                          onChange={() => toggleSubject(subject)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age Groups */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Age Group
                  </label>
                  <div className="space-y-2">
                    {AGE_GROUPS.map((age) => (
                      <label key={age} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAgeGroups.includes(age)}
                          onChange={() => toggleAgeGroup(age)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{age} years</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <select
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="in-person">In-Person Only</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                {/* Zip Code */}
                <div className="mb-6">
                  <Input
                    label="Zip Code"
                    type="text"
                    placeholder="Enter zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Hourly Rate
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 0].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {rating > 0 ? (
                            <>
                              <Star size={14} className="inline fill-yellow-400 text-yellow-400" />
                              {' '}{rating}+
                            </>
                          ) : (
                            'Any rating'
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Background Check */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={backgroundCheckOnly}
                      onChange={(e) => setBackgroundCheckOnly(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Background check completed
                    </span>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {loading ? 'Loading...' : `${tutors.length} ${tutors.length === 1 ? 'tutor' : 'tutors'} found`}
              </p>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="price-low">Lowest Price</option>
                <option value="price-high">Highest Price</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading tutors...</p>
              </div>
            )}

            {/* Tutor Cards */}
            {!loading && tutors.length > 0 && (
              <div className="space-y-4">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && tutors.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tutors found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? (
                    <>No tutors match your search for "{searchQuery}". Try different keywords or clear your search.</>
                  ) : hasActiveFilters ? (
                    <>We don't have any tutors matching your filters. Try adjusting your criteria.</>
                  ) : (
                    <>No tutors available yet. Check back soon!</>
                  )}
                </p>
                {(hasActiveFilters || searchQuery) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BrowsePageContent />
    </Suspense>
  )
}
