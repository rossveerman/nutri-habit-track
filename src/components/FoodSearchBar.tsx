
import React from "react";
import { Search, QrCode, Mic, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FoodSearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  onScanBarcode?: () => void;
  onVoiceSearch: () => void;
  onClear: () => void;
}

const FoodSearchBar: React.FC<FoodSearchBarProps> = ({
  search,
  setSearch,
  onClear,
  onScanBarcode,
  onVoiceSearch,
}) => {
  const navigate = useNavigate();
  
  const handleScan = () => {
    if (onScanBarcode) {
      onScanBarcode();
    } else {
      // If no explicit handler, navigate to the scanner page
      navigate('/barcode');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-center">
      <div className="relative flex-1">
        <Input
          type="text"
          aria-label="Search foods"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={20} />
        {search && (
          <button
            aria-label="Clear search"
            className="absolute right-3 top-2.5 p-1 text-muted-foreground hover:text-red-500"
            onClick={onClear}
            tabIndex={0}
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div className="flex gap-2 items-center mt-2 md:mt-0">
        <Button
          variant="outline"
          size="icon"
          aria-label="Scan barcode"
          onClick={handleScan}
        >
          <QrCode />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Voice search"
          onClick={onVoiceSearch}
        >
          <Mic />
        </Button>
      </div>
    </div>
  );
};

export default FoodSearchBar;
