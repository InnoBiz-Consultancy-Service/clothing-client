"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

type Country = {
  name: string
  code: string
  dial_code: string
  flag: string
}

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

export function PhoneInput({ value, onChange, placeholder = "Phone number", className, error }: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags")
        const data = await response.json()

        const formattedCountries = data
          .filter((country: { idd: { root: string } }) => country.idd.root)
          .map((country: { name: { common: string }; cca2: string; idd: { root: string; suffixes?: string[] }; flags: { svg: string } }) => ({
            name: country.name.common,
            code: country.cca2,
            dial_code: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`,
            flag: country.flags.svg,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)

        // Set default to Bangladesh or US if available
        const defaultCountry =
          formattedCountries.find((c: Country) => c.code === "BD") ||
          formattedCountries.find((c: Country) => c.code === "US") ||
          formattedCountries[0]

        if (defaultCountry) {
          setSelectedCountry(defaultCountry)
        }

        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch countries:", error)
        // Fallback to some default countries
        const fallbackCountries = [
          { name: "United States", code: "US", dial_code: "+1", flag: "https://flagcdn.com/us.svg" },
          { name: "Bangladesh", code: "BD", dial_code: "+880", flag: "https://flagcdn.com/bd.svg" },
          { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "https://flagcdn.com/gb.svg" },
        ]
        setCountries(fallbackCountries)
        setSelectedCountry(fallbackCountries[0])
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      onChange(`${selectedCountry.dial_code} ${phoneNumber}`)
    }
  }, [selectedCountry, phoneNumber, onChange])

  useEffect(() => {
    if (value && selectedCountry) {
    //   const dialCodePattern = new RegExp(`^${selectedCountry.dial_code}\\s*`)
    //   const extractedNumber = value.replace(dialCodePattern, "").trim()
    //   if (extractedNumber !== phoneNumber) {
    //     setPhoneNumber(extractedNumber)
    //   }
    }
  }, [value, selectedCountry])

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex w-[130px] justify-between rounded-r-none border-r-0 px-3",
              error && "border-destructive",
            )}
            disabled={loading}
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2 truncate">
                {selectedCountry.flag && (
                  <Image
                    src={selectedCountry.flag || "/placeholder.svg"}
                    alt={selectedCountry.name}
                    width={20}
                    height={15}
                    className="h-3.5 w-5 object-contain"
                  />
                )}
                <span className="truncate">{selectedCountry.dial_code}</span>
              </div>
            ) : (
              <span>Select</span>
            )}
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandList className="max-h-[300px]">
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dial_code}`}
                    onSelect={() => {
                      setSelectedCountry(country)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {country.flag && (
                        <Image
                          src={country.flag || "/placeholder.svg"}
                          alt={country.name}
                          width={20}
                          height={15}
                          className="h-3.5 w-5 object-contain"
                        />
                      )}
                      <span>{country.name}</span>
                      <span className="ml-auto text-muted-foreground">{country.dial_code}</span>
                    </div>
                    {selectedCountry?.code === country.code && <Check className="ml-auto h-4 w-4" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={cn("rounded-l-none", error && "border-destructive")}
        placeholder={placeholder}
        disabled={loading}
      />
    </div>
  )
}

