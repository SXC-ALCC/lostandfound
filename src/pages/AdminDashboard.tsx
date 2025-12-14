import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getLostItemsToApprove,
    getFoundItemsToApprove,
    approveLostItem,
    approveFoundItem,
    removeLostItem,
    removeFoundItem
} from "@/services/api";
import { Item } from "@/types/item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/admin/login");
        }
    }, [user, loading, navigate]);

    const { data: lostItems, isLoading: loadingLost, isError: errorLost } = useQuery({
        queryKey: ["lostItemsToApprove"],
        queryFn: getLostItemsToApprove,
        retry: 1, // Don't retry too many times for 500s
    });

    const { data: foundItems, isLoading: loadingFound, isError: errorFound } = useQuery({
        queryKey: ["foundItemsToApprove"],
        queryFn: getFoundItemsToApprove,
        retry: 1,
    });

    const approveMutation = useMutation({
        mutationFn: async ({ id, type, decision }: { id: number, type: 'lost' | 'found', decision: boolean }) => {
            if (type === 'lost') {
                return approveLostItem(id, decision);
            } else {
                return approveFoundItem(id, decision);
            }
        },
        onSuccess: () => {
            toast.success("Item updated successfully");
            queryClient.invalidateQueries({ queryKey: ["lostItemsToApprove"] });
            queryClient.invalidateQueries({ queryKey: ["foundItemsToApprove"] });
        },
        onError: () => {
            toast.error("Failed to update item");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async ({ id, type }: { id: number, type: 'lost' | 'found' }) => {
            if (type === 'lost') {
                return removeLostItem(id);
            } else {
                return removeFoundItem(id);
            }
        },
        onSuccess: () => {
            toast.success("Item removed successfully");
            queryClient.invalidateQueries({ queryKey: ["lostItemsToApprove"] });
            queryClient.invalidateQueries({ queryKey: ["foundItemsToApprove"] });
        },
        onError: () => {
            toast.error("Failed to remove item");
        }
    });

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    const ItemCard = ({ item, type }: { item: Item, type: 'lost' | 'found' }) => (
        <Card key={item.id} className="w-full md:w-[350px] mb-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{item.category}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                )}
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                    <p>Location: {item.location}</p>
                    <p>Date: {item.date}</p>
                    <p>Reporter: {item.posterName} ({item.email})</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                    onClick={() => approveMutation.mutate({ id: Number(item.id), type, decision: true })}
                >
                    <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                    onClick={() => approveMutation.mutate({ id: Number(item.id), type, decision: false })}
                >
                    <X className="w-4 h-4 mr-1" /> Reject
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate({ id: Number(item.id), type })}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Tabs defaultValue="lost" className="w-full">
                <TabsList className="mb-8">
                    <TabsTrigger value="lost">Lost Items ({lostItems?.length || 0})</TabsTrigger>
                    <TabsTrigger value="found">Found Items ({foundItems?.length || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="lost" className="space-y-4">
                    {loadingLost ? (
                        <div>Loading...</div>
                    ) : errorLost ? (
                        <div className="text-red-500">Failed to load lost items. Please try again later.</div>
                    ) : lostItems?.length === 0 ? (
                        <p>No pending lost items.</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {lostItems?.map((item) => (
                                <ItemCard key={item.id} item={item} type="lost" />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="found" className="space-y-4">
                    {loadingFound ? (
                        <div>Loading...</div>
                    ) : errorFound ? (
                        <div className="text-red-500">Failed to load found items. Please try again later.</div>
                    ) : foundItems?.length === 0 ? (
                        <p>No pending found items.</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {foundItems?.map((item) => (
                                <ItemCard key={item.id} item={item} type="found" />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
