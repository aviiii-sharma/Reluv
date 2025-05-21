import { redirect } from "next/navigation";
import { createClient } from "@/../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, Upload, Tag, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SellerDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user data including verification status
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const isVerified = userData?.is_verified || false;

  // Mock data for seller's listings
  const listings = [
    {
      id: 1,
      name: "Vintage Leather Jacket",
      price: "$65",
      status: "active",
      views: 24,
      likes: 5,
      dateAdded: "2023-05-15",
    },
    {
      id: 2,
      name: "90s Band T-Shirt",
      price: "$28",
      status: "active",
      views: 18,
      likes: 3,
      dateAdded: "2023-05-18",
    },
    {
      id: 3,
      name: "High-Waisted Mom Jeans",
      price: "$42",
      status: "sold",
      views: 36,
      likes: 8,
      dateAdded: "2023-05-10",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <div className="bg-secondary/20 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>Manage your listings and track your sales</span>
            </div>
          </header>

          {/* Verification Status */}
          {!isVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-yellow-500" />
              <div>
                <h3 className="font-medium">Verification Required</h3>
                <p className="text-sm text-gray-600">
                  Your account needs to be verified before you can list items
                  for sale.
                </p>
              </div>
              <Button className="ml-auto bg-primary hover:bg-primary/90">
                Request Verification
              </Button>
            </div>
          )}

          {isVerified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <div>
                <h3 className="font-medium">Verified Seller</h3>
                <p className="text-sm text-gray-600">
                  Your account is verified. You can list items for sale.
                </p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Upload a new item
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <div className="mt-6">
                <Button
                  disabled={!isVerified}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isVerified ? "Upload Photos" : "Verification Required"}
                </Button>
              </div>
            </div>
          </section>

          {/* Listings Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Listings</h2>
              <Button
                disabled={!isVerified}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                <Tag className="mr-2 h-4 w-4" />
                New Listing
              </Button>
            </div>

            {listings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Item</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Views</th>
                      <th className="px-6 py-3">Likes</th>
                      <th className="px-6 py-3">Date Added</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.likes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.dateAdded}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-primary hover:text-primary/80 mr-4"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No listings yet. Create your first listing!
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
