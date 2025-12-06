import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ItemStatus, ItemCategory } from "@/types/item";
import { imageToBase64 } from "@/lib/utils"; // <-- IMPORTANT

const Post = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<ItemStatus>("lost");
  const [category, setCategory] = useState<ItemCategory>("other");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // 📌 Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 📌 FORM SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Convert image → Base64
    let base64Image = "";
    if (image) {
      base64Image = await imageToBase64(image);
    }

    // Create payload object to send to Google Sheets
    const payload = {
      status,
      name: formData.get("name"),
      category,
      description: formData.get("description"),
      location: formData.get("location"),
      date: formData.get("date"),
      posterName: formData.get("posterName"),
      section: formData.get("section"),
      email: formData.get("email"),
      image: base64Image,
    };

    console.log("Submitting to Google Sheets:", payload);

    // 📌 SEND to Google Apps Script Web App
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwlK5qmmkkznm9OLYpryahAVqpCJkDjQ3FiitwJ4zfXH7X9dkjlx-PW5AhKCsXL-JY4/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast({
        title: "Success!",
        description:
          "Your post has been submitted and is pending approval.",
      });

      e.currentTarget.reset();
      setImage(null);
      setImagePreview("");
      setStatus("lost");
      setCategory("other");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description:
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Post an Item</CardTitle>
            <CardDescription>
              Fill out the form below to report a lost or found item
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status */}
              <div className="space-y-2">
                <Label>Item Status *</Label>
                <RadioGroup
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as ItemStatus)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lost" id="lost" />
                    <Label className="cursor-pointer" htmlFor="lost">
                      Lost
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found" id="found" />
                    <Label className="cursor-pointer" htmlFor="found">
                      Found
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input id="name" name="name" required />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={category}
                  onValueChange={(value) =>
                    setCategory(value as ItemCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id-card">ID Card</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="stationery">Stationery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" required />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" name="date" type="date" required />
              </div>

              {/* Poster Name */}
              <div className="space-y-2">
                <Label htmlFor="posterName">Your Name *</Label>
                <Input id="posterName" name="posterName" required />
              </div>

              {/* Section */}
              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Input id="section" name="section" required />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">College Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="max-w-xs border rounded-lg mt-2"
                  />
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Post;
