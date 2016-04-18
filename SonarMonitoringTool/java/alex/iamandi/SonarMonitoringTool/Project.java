package alex.iamandi.SonarMonitoringTool;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "Project")
@IdClass(ProjectPK.class)
public class Project {

	@Id
	Long id;
	@Id
	String url;
	String key;
	String name;
	String lname;
	String scope;
	String qualifier;
	String uuid;
	@Column(length = 1000)
	String description;
	String version;
	String date;
	String creationDate;
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonManagedReference
	@OrderBy("date")
	private Set<Metric> msr = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getURL() {
		return url;
	}

	public void setURL(String uRL) {
		url = uRL;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Project() {
		super();
	}

	// public ProjectPK getId() {
	// return id.getId();
	// }
	//
	// public void setId(ProjectPK id) {
	// this.id.getId() = id;
	// }

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getQualifier() {
		return qualifier;
	}

	public void setQualifier(String qualifier) {
		this.qualifier = qualifier;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		String s = "";
		for (Metric metric : msr) {
			s = s + metric.toString();
		}
		return id + ": " + name + " " + s + "</br>";
	}

	public Set<Metric> getAllMsr() {
		return msr;
	}

	public void setMsr(Set<Metric> msr) {
		this.msr = msr;
	}

	public void addMsr(Metric metric) {
		this.msr.add(metric);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Project other = (Project) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public void addMetrics(Collection<? extends Metric> allMsr) {
		this.msr.addAll(allMsr);
	}

}
