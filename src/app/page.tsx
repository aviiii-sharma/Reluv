import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Search,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data for featured items
  const featuredItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: "$45",
      seller: "@vintagefinds",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    },
    {
      id: 2,
      name: "Retro Graphic Tee",
      price: "$22",
      seller: "@retrothreads",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    },
    {
      id: 3,
      name: "Y2K Mini Skirt",
      price: "$28",
      seller: "@y2kfashion",
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
    },
    {
      id: 4,
      name: "Boho Maxi Dress",
      price: "$38",
      seller: "@bohochic",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    },
    {
      id: 5,
      name: "Leather Crossbody Bag",
      price: "$32",
      seller: "@vintagebags",
      image:
        "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=80",
    },
    {
      id: 6,
      name: "Chunky Knit Sweater",
      price: "$35",
      seller: "@cozythreads",
      image:
        "https://images.unsplash.com/photo-1576566588022-66ae65e0dcb9?w=500&q=80",
    },
    {
      id: 7,
      name: "Platform Sneakers",
      price: "$48",
      seller: "@kicksresale",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
    },
    {
      id: 8,
      name: "Silk Scarf",
      price: "$18",
      seller: "@accessorylove",
      image:
        "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500&q=80",
    },
  ];

  // Mock data for trusted sellers
  const trustedSellers = [
    {
      name: "@vintagefinds",
      followers: "15.2K",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintagefinds",
    },
    {
      name: "@retrothreads",
      followers: "22.8K",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=retrothreads",
    },
    {
      name: "@y2kfashion",
      followers: "34.5K",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=y2kfashion",
    },
    {
      name: "@bohochic",
      followers: "18.7K",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=bohochic",
    },
    {
      name: "@vintagebags",
      followers: "12.3K",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintagebags",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Search for vintage tees, denim jackets, and more..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-14 gap-4">
            <Link
              href="/dashboard?category=hats"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Hats & Caps"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">
                HATS & CAPS
              </span>
            </Link>

            <Link
              href="/dashboard?category=clothing"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Clothing"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">CLOTHING</span>
            </Link>

            <Link
              href="/dashboard?category=eyewear"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Eyewear"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">EYEWEAR</span>
            </Link>

            <Link
              href="/dashboard?category=accessories"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1631160299919-6a175aa6d189?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Accessories"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">
                ACCESSORIES
              </span>
            </Link>

            <Link
              href="/dashboard?category=hoodies"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Hoodies"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">HOODIES</span>
            </Link>

            <Link
              href="/dashboard?category=tshirts"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"
                  width={40}
                  height={40}
                  alt="T-Shirts"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">TSHIRTS</span>
            </Link>

            <Link
              href="/dashboard?category=shirts"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Shirts"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">SHIRTS</span>
            </Link>

            <Link
              href="/dashboard?category=bottoms"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80"
                  width={40}
                  height={40}
                  alt="All Bottoms"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">
                ALL BOTTOMS
              </span>
            </Link>

            <Link
              href="/dashboard?category=wallets"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Wallets"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">WALLETS</span>
            </Link>

            <Link
              href="/dashboard?category=backpack"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Backpack"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">BACKPACK</span>
            </Link>

            <Link
              href="/dashboard?category=skateboards"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Skateboards"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">
                SKATEBOARDS
              </span>
            </Link>

            <Link
              href="/dashboard?category=socks"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Socks"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">SOCKS</span>
            </Link>

            <Link
              href="/dashboard?category=boxers"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Boxers"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">BOXERS</span>
            </Link>

            <Link
              href="/dashboard?category=collabs"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&q=80"
                  width={40}
                  height={40}
                  alt="Collabs"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">COLLABS</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-8">
            <Link
              href="/dashboard?category=new"
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              NEW ARRIVALS
            </Link>
            <Link
              href="/dashboard?category=hats"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              HATS & CAPS
            </Link>
            <Link
              href="/dashboard?category=royal"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              ROYAL ENFIELD X UM
            </Link>
            <Link
              href="/dashboard?category=mtv"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              MTV X UM
            </Link>
          </div>
        </div>
      </section>

      {/* Zero Commission Banner */}
      <section className="py-10 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-3xl font-bold">
              ZERO COMMISSION MARKETPLACE
            </div>
            <div className="text-lg">Sellers keep 100% of their sales</div>
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Selling Today
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Thrift Finds</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="font-bold text-green-600">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.seller}</p>
                  <button className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors">
                    View Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Browse All Items
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Sellers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trusted Instagram Sellers</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustedSellers.map((seller, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src={seller.image}
                    alt={seller.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900">{seller.name}</h3>
                <p className="text-sm text-gray-500">
                  {seller.followers} followers
                </p>
                <button className="mt-3 px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our marketplace connects thrift enthusiasts with Instagram sellers
              in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-green-600 mb-4 flex justify-center">
                <Search className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Discover</h3>
              <p className="text-gray-600">
                Explore unique pre-loved items from trusted Instagram sellers
                all in one place.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-green-600 mb-4 flex justify-center">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Directly</h3>
              <p className="text-gray-600">
                Message sellers directly with no middleman and arrange your
                purchase.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-green-600 mb-4 flex justify-center">
                <Tag className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sell Your Items</h3>
              <p className="text-gray-600">
                List your pre-loved clothing with zero commission fees - keep
                100% of your sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Thrift Community Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to refresh your wardrobe or sell pre-loved
            items, our marketplace connects you with a community that values
            sustainable fashion and ethical consumption.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              Sign Up as Buyer
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/sign-up?seller=true"
              className="inline-flex items-center px-6 py-3 text-primary bg-white border border-primary rounded-lg hover:bg-primary/5 transition-colors shadow-md hover:shadow-lg"
            >
              Register as Seller
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Quick & Easy Sign-up</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Verified Sellers</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Zero Commission</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
