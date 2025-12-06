import { useState, useMemo } from "react";
import ItemCard from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Item, ItemStatus, ItemCategory } from "@/types/item";

const mockItems: Item[] = [
  {
    id: "1",
    status: "lost",
    name: "Blue Backpack",
    category: "bag",
    description: "Navy blue backpack with laptop compartment, lost near the library",
    location: "Library",
    date: "2025-10-10",
    posterName: "Sidant Chaturbedi",
    section: "A2A",
    email: "024a121@sxc.edu.np",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    createdAt: "2025-10-10T10:00:00Z",
    approved: true,
  },
  {
    id: "2",
    status: "found",
    name: "Student ID Card",
    category: "id-card",
    description: "Found ID card with name Prerit Gautam",
    location: "Cafeteria",
    date: "2025-10-11",
    posterName: "Stuti Upreti",
    section: "A2A",
    email: "024a123@sxc.edu.np",
    createdAt: "2025-10-11T14:30:00Z",
    approved: true,
  },
];

const Items = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ItemStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all");

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchQuery, statusFilter, categoryFilter]);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lost & Found Items</h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ItemStatus | "all")}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="lost">Lost Items</SelectItem>
                <SelectItem value="found">Found Items</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as ItemCategory | "all")}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="id-card">ID Card</SelectItem>
                <SelectItem value="bag">Bag</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
