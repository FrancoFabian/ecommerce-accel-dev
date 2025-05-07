//import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
export const StepAddress = ({ formik, date, setDate }: any) => {
    return (
      <div className="space-y-4">
        {/* Birth Date */}
        <div className="space-y-2">
          <Label>Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate: Date) => {
                  setDate(newDate);
                  formik.setFieldValue("birthDate", newDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
  
        {/* Street */}
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            name="street"
            onChange={formik.handleChange}
            value={formik.values.street}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
  
        {/* Colony */}
        <div className="space-y-2">
          <Label htmlFor="colony">Colony</Label>
          <Input
            id="colony"
            name="colony"
            onChange={formik.handleChange}
            value={formik.values.colony}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
  
        {/* Municipality */}
        <div className="space-y-2">
          <Label htmlFor="municipality">Municipality</Label>
          <Input
            id="municipality"
            name="municipality"
            onChange={formik.handleChange}
            value={formik.values.municipality}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
  
        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
  
        {/* ZIP Code */}
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            onChange={formik.handleChange}
            value={formik.values.zipCode}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
  
        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            className="w-full px-5 py-3 border border-gray-300 rounded text-base"
          />
        </div>
      </div>
    );
  }