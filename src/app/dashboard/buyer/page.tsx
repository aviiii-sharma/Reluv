import { redirect } from "next/navigation";
import { createClient } from "@/../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BuyerDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for featured items
  const featuredItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: "$45",
      seller: "@vintagefinds",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
      condition: "Excellent",
    },
    {
      id: 2,
      name: "Retro Graphic Tee",
      price: "$22",
      seller: "@retrothreads",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
      condition: "Good",
    },
    {
      id: 3,
      name: "Y2K Mini Skirt",
      price: "$28",
      seller: "@y2kfashion",
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
      condition: "Like New",
    },
    {
      id: 4,
      name: "Boho Maxi Dress",
      price: "$38",
      seller: "@bohochic",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
      condition: "Good",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
            <div className="bg-secondary/20 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Browse and discover unique thrifted items from our verified
                sellers
              </span>
            </div>
          </header>

          {/* Search Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Search for vintage tees, denim jackets, and more..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShoppingBag className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm font-medium mr-2 text-gray-500">
                Filter by:
              </span>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                Tops
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                Bottoms
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                Dresses
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                Outerwear
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                Accessories
              </button>
            </div>
          </section>

          {/* Featured Items */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Featured Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {item.condition}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <span className="font-bold text-primary">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.seller}</p>
                    <button className="mt-3 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded text-sm font-medium transition-colors">
                      View Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/dashboard/buyer/browse"
                className="inline-flex items-center px-6 py-3 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Browse All Items
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
