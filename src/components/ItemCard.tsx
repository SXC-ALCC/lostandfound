import { Item } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, User, Mail } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

const categoryLabels: Record<string, string> = {
  "id-card": "ID Card",
  "bag": "Bag",
  "electronics": "Electronics",
  "books": "Books",
  "stationery": "Stationery",
  "other": "Other",
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:border-primary transition-all hover:shadow-lg group">
      {item.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          <Badge variant={item.status === "lost" ? "destructive" : "default"}>
            {item.status === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {categoryLabels[item.category]}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>

          <div className="pt-2 border-t space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{item.posterName} • {item.section}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                {item.email}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
