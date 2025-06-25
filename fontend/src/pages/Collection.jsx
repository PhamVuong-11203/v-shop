import React, { useContext, useEffect, useState, useCallback } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if (showSearch && search){
      productsCopy = productsCopy.filter(item=>
        item.name.toLowerCase().includes(search.toLowerCase()) 
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category, subCategory, sortType]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);


  return (
    <div className='flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10'>
      {/* Filter */}
      <div className="min-w-60 animate-fade-down">
        <p onClick={() => setShowFilter(!showFilter)} className='text-xl cursor-pointer my-2 flex items-center gap-2 max-w-24'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* CATEGORIES Filter */}

        <div className={`border border-gray-400 pl-5 py-3 mt-6 
          ${showFilter ? ' ' : 'hidden'} sm:block `}>
          <p className='text-sm mb-3 font-medium'>CATEGORIES</p>
          <div className='flex flex-col font-light text-gray-700 text-sm gap-2'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'Men'} name="" id="" />
              Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'Women'} name="" id="" />
              Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'kids'} name="" id="" />
              kids
            </p>
          </div>
          {/* type filter */}


        </div>

        {/* TPYE Filter */}

        <div className={`border border-gray-400 pl-5 py-3 mt-6 
          ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-sm mb-3 font-medium'>TYPE</p>
          <div className='flex flex-col font-light text-gray-700 text-sm gap-2'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Topwear'} name="" id="" />
              Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} name="" id="" />
              Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Winterwear'} name="" id="" />
              Winterwear
            </p>
          </div>


        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL '} text2={' COLLECTION'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-400 text-sm px-2' name="" id="">
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to Hight</option>
            <option value="high-low">Sort by:High-Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                lg:grid-cols-5 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image}
                name={item.name} price={item.price}
              />
            ))

          }
        </div>
      </div>

    </div>
  )
}

export default Collection

