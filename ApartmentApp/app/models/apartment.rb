class Apartment < ApplicationRecord

  geocoded_by :address

  after_validation :geocode

  def address
    "#{street1} #{street2}, #{city}, #{state} #{postalcode}, #{country}"
  end

end
